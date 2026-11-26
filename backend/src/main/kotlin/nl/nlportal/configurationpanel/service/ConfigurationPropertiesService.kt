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

package nl.nlportal.configurationpanel.service

import io.github.oshai.kotlinlogging.KotlinLogging
import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.event.ConfigurationPropertiesChangedEvent
import nl.nlportal.configurationpanel.event.FeatureToggledEvent
import nl.nlportal.configurationpanel.exception.PropertyKeyNotAllowedException
import nl.nlportal.configurationpanel.repository.ConfigurationsRepository
import nl.nlportal.configurationpanel.security.PropertyKeyAllowlist
import org.springframework.cache.annotation.Cacheable
import org.springframework.context.ApplicationEventPublisher
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ConfigurationPropertiesService(
    private val configRepository: ConfigurationsRepository,
    private val applicationEventPublisher: ApplicationEventPublisher,
    private val propertyKeyAllowlist: PropertyKeyAllowlist,
) {
    @Cacheable("configCache")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        application: String,
        propertyKey: String,
    ): ConfigurationProperty? {
        requireAllowedKeys(listOf(propertyKey))
        return configRepository.findByApplicationAndPropertyKey(application, propertyKey)
    }

    fun getConfigurationPropertiesByApplicationOrNull(application: String): List<ConfigurationProperty>? = configRepository
        .findByApplicationAndRetiredInIsNull(application)
        ?.filter { propertyKeyAllowlist.isAllowed(it.propertyKey) }

    fun getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(
        application: String,
        featureKey: String,
    ): List<ConfigurationProperty>? {
        requireAllowedKeys(listOf(featureKey))
        return configRepository.findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull(application, featureKey)
    }

    fun deleteConfigurationPropertiesByApplicationAndFeatureKey(
        application: String,
        featureKey: String,
    ) {
        requireAllowedKeys(listOf(featureKey))
        configRepository
            .findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull(application, featureKey)
            ?.apply {
                configRepository.deleteAll(this)
                logModified(map { it.propertyKey })
            }
    }

    fun getRetiredConfigurationProperties(application: String): List<ConfigurationProperty> = configRepository.findByApplicationAndRetiredInIsNotNullOrderByRetiredInAscPropertyKeyAsc(application)

    /**
     * Deletes one retired row. Returns false when the key doesn't exist or isn't retired.
     * Publishes no change event: the NL Portal versions that still read retired keys are not notified.
     * Not allowlist-checked: retired keys can always be deleted.
     */
    @Transactional
    fun deleteRetiredConfigurationProperty(
        application: String,
        propertyKey: String,
    ): Boolean {
        val retired =
            configRepository.findByApplicationAndPropertyKeyAndRetiredInIsNotNull(application, propertyKey)
                ?: return false
        configRepository.delete(retired)
        return true
    }

    @Transactional
    fun deleteRetiredConfigurationProperties(
        application: String,
        retiredIn: String,
    ) {
        configRepository.deleteAll(configRepository.findRetiredByApplicationAndVersion(application, retiredIn))
    }

    fun getFeatureToggle(
        application: String,
        featureKey: String,
    ): ConfigurationProperty? {
        requireAllowedKeys(listOf("$featureKey.enabled"))
        return configRepository.findByApplicationAndPropertyKey(application, "$featureKey.enabled")
    }

    @Transactional
    fun setFeatureToggle(
        application: String,
        featureKey: String,
        enabled: Boolean,
    ): ConfigurationProperty? {
        val propertyKey = "$featureKey.enabled"
        requireAllowedKeys(listOf(propertyKey))

        val existing = configRepository.findByApplicationAndPropertyKey(application, propertyKey)

        val payload =
            existing?.copy(propertyValue = enabled.toString())
                ?: ConfigurationProperty(
                    application = application,
                    propertyKey = propertyKey,
                    propertyValue = enabled.toString(),
                )

        return configRepository
            .save(payload)
            .also {
                logModified(listOf(it.propertyKey))
                applicationEventPublisher.publishEvent(FeatureToggledEvent(listOf(it)))
            }
    }

    @Transactional
    fun saveConfigurationProperty(config: ConfigurationProperty): ConfigurationProperty? {
        requireAllowedKeys(listOf(config.propertyKey))
        return configRepository
            .save(config)
            .also {
                logModified(listOf(it.propertyKey))
                applicationEventPublisher.publishEvent(
                    ConfigurationPropertiesChangedEvent(listOf(it)),
                )
            }
    }

    @Transactional
    fun saveConfigurationProperties(configs: List<ConfigurationProperty>): List<ConfigurationProperty> {
        requireAllowedKeys(configs.map { it.propertyKey })
        return configRepository
            .saveAll(configs)
            .also {
                logModified(it.map { config -> config.propertyKey })
                applicationEventPublisher.publishEvent(
                    ConfigurationPropertiesChangedEvent(it),
                )
            }
    }

    private fun requireAllowedKeys(keys: List<String>) {
        val disallowed = propertyKeyAllowlist.disallowed(keys)
        if (disallowed.isNotEmpty()) {
            logger.warn { "User ${currentUser()}: property keys $disallowed denied" }
            throw PropertyKeyNotAllowedException(disallowed)
        }
    }

    private fun logModified(keys: List<String>) {
        if (keys.isNotEmpty()) logger.info { "User ${currentUser()} modified the following keys: $keys" }
    }

    private fun currentUser() = SecurityContextHolder.getContext().authentication?.name ?: "unknown"

    private companion object {
        private val logger = KotlinLogging.logger { }
    }
}
