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

import nl.nlportal.configurationpanel.domain.ConfigurationComponentStatus
import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class ConfigService(
    private val configRepository: ConfigRepository,
    private val notifyService: NotifyService
) {

    @Cacheable("configCache")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        application: String,
        propertyKey: String
    ): ConfigurationProperty? {
        return configRepository.findByApplicationAndPropertyKey(application, propertyKey)
    }

    fun getConfigurationPropertiesByApplicationOrNull(application: String): List<ConfigurationProperty>? {
        return configRepository.findByApplication(application)
    }

    fun getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(
        application: String,
        featureKey: String
    ): List<ConfigurationProperty>? {
        return configRepository.findByApplicationAndPropertyKeyStartsWith(application, featureKey)
    }

    fun deleteConfigurationPropertiesByApplicationAndFeatureKey(
        application: String,
        featureKey: String
    ) {
        configRepository
            .findByApplicationAndPropertyKeyStartsWith(application, featureKey)
            ?.apply { configRepository.deleteAll(this) }
    }

    fun saveConfigurationProperty(config: ConfigurationProperty): ConfigurationProperty? {
        return configRepository.save(config)
    }

    fun saveConfigurationProperties(configs: List<ConfigurationProperty>): List<ConfigurationProperty> {
        return configRepository
            .saveAll(configs)
            .also {
                notifyService.restartNlPortalClients()
            }
    }

    fun getConfigurationComponentsStatus(): List<ConfigurationComponentStatus>? {
        val componentsStatus = mutableListOf<ConfigurationComponentStatus>()
        configRepository.findByPropertyKeyContains(".enabled")?.forEach {
            componentsStatus.add(
                ConfigurationComponentStatus(
                    featureName = it.propertyKey.split(".")[2],
                    isEnabled = it.propertyValue.toBoolean()
                )
            )
        }

        return componentsStatus
    }
}
