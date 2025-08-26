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

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigurationsRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class ConfigurationsService(
    private val configRepository: ConfigurationsRepository,
    private val notifyService: NotifyService,
) {
    @Cacheable("configCache")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        application: String,
        propertyKey: String,
    ): ConfigurationProperty? = configRepository.findByApplicationAndPropertyKey(application, propertyKey)

    fun getConfigurationPropertiesByApplicationOrNull(application: String): List<ConfigurationProperty>? =
        configRepository.findByApplication(application)

    fun getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(
        application: String,
        featureKey: String,
    ): List<ConfigurationProperty>? = configRepository.findByApplicationAndPropertyKeyStartsWith(application, featureKey)

    fun deleteConfigurationPropertiesByApplicationAndFeatureKey(
        application: String,
        featureKey: String,
    ) {
        configRepository
            .findByApplicationAndPropertyKeyStartsWith(application, featureKey)
            ?.apply { configRepository.deleteAll(this) }
    }

    fun saveConfigurationProperty(config: ConfigurationProperty): ConfigurationProperty? = configRepository.save(config)

    fun saveConfigurationProperties(configs: List<ConfigurationProperty>): List<ConfigurationProperty> =
        configRepository
            .saveAll(configs)
            .also {
                notifyService.restartNlPortalClients()
            }
}
