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

package nl.nlportal.configurationpanel.domain

import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.persistence.Column
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import nl.nlportal.configurationpanel.crypto.ConfigurationValueConverter
import java.time.Instant

@Entity
@Table(name = "nlp_configuration")
data class ConfigurationProperty(
    @Id
    @Column(name = "property_key", updatable = false, nullable = false)
    val propertyKey: String = "",
    @Column(name = "property_value", updatable = true, nullable = false)
    @Convert(converter = ConfigurationValueConverter::class)
    val propertyValue: String = "",
    @Column(name = "application", updatable = false, nullable = false)
    val application: String = "",
    @Column(name = "profile", nullable = true)
    val profile: String? = null,
    @Column(name = "label", nullable = true)
    val label: String? = null,
    @Column(name = "modified_on")
    val modifiedOn: Instant? = Instant.now(),
    /** The NL Portal version that stopped reading this key. Only Liquibase changelogs set it. */
    @Column(name = "retired_in", insertable = false, updatable = false)
    val retiredIn: String? = null,
) {
    // Values can be secrets: show them only with TRACE on this logger, its package or root
    override fun toString() = "ConfigurationProperty(propertyKey=$propertyKey, " +
        "propertyValue=${if (logger.isTraceEnabled()) propertyValue else "[PROTECTED]"}, " +
        "application=$application, profile=$profile, label=$label, modifiedOn=$modifiedOn, retiredIn=$retiredIn)"

    private companion object {
        private val logger = KotlinLogging.logger { }
    }
}
