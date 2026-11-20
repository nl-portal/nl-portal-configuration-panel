/*
 * Copyright 2025 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package nl.nlportal.configurationpanel.configuration

import io.github.oshai.kotlinlogging.KotlinLogging
import nl.nlportal.configurationpanel.security.PropertyKeyAllowlist
import org.springframework.beans.factory.ObjectProvider
import org.springframework.beans.factory.config.BeanPostProcessor
import org.springframework.cloud.config.environment.Environment
import org.springframework.cloud.config.environment.PropertySource
import org.springframework.cloud.config.server.environment.EnvironmentRepository
import org.springframework.cloud.config.server.environment.JdbcEnvironmentRepository
import org.springframework.core.Ordered
import org.springframework.stereotype.Component

/**
 * Wraps the config server's JDBC repository so NL Portal is only served keys from the allowlist.
 */
@Component
class AllowlistEnvironmentRepositoryPostProcessor(
    // ObjectProvider: a BeanPostProcessor must not resolve beans while post processors are still being created
    private val propertyKeyAllowlist: ObjectProvider<PropertyKeyAllowlist>,
) : BeanPostProcessor {
    override fun postProcessAfterInitialization(
        bean: Any,
        beanName: String,
    ): Any = if (bean is JdbcEnvironmentRepository) AllowlistEnvironmentRepository(bean, propertyKeyAllowlist) else bean
}

class AllowlistEnvironmentRepository(
    private val delegate: JdbcEnvironmentRepository,
    private val propertyKeyAllowlist: ObjectProvider<PropertyKeyAllowlist>,
) : EnvironmentRepository,
    Ordered {
    override fun findOne(
        application: String,
        profile: String,
        label: String?,
    ): Environment = filter(delegate.findOne(application, profile, label))

    override fun findOne(
        application: String,
        profile: String,
        label: String?,
        includeOrigin: Boolean,
    ): Environment = filter(delegate.findOne(application, profile, label, includeOrigin))

    override fun getOrder() = delegate.order

    private fun filter(environment: Environment): Environment {
        val allowlist = propertyKeyAllowlist.getObject()
        val filtered =
            Environment(environment.name, environment.profiles, environment.label, environment.version, environment.state)
        environment.propertySources.forEach { source ->
            val allowed =
                source.source.filterKeys { key ->
                    allowlist.isAllowed(key.toString()).also { ok ->
                        if (!ok) logger.warn { "Property key $key in ${source.name} is not allowed and is not served" }
                    }
                }
            filtered.add(PropertySource(source.name, allowed))
        }
        return filtered
    }

    private companion object {
        private val logger = KotlinLogging.logger { }
    }
}
