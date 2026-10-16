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

package nl.nlportal.configurationpanel.web.rest

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.service.ConfigurationPropertiesService
import nl.nlportal.configurationpanel.web.rest.dto.FeatureEnabledDTO
import nl.nlportal.configurationpanel.web.rest.dto.RetiredConfigurationKeyDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ConfigurationsResource(
    private val configService: ConfigurationPropertiesService,
) {
    @GetMapping("/v1/configurations/{application}")
    fun getConfigurationPropertiesByApplicationOrNull(
        @PathVariable("application") application: String,
    ): List<ConfigurationProperty>? = configService.getConfigurationPropertiesByApplicationOrNull(application)

    @GetMapping("/v1/configurations/{application}/features/{featureKey}")
    fun getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String,
    ): List<ConfigurationProperty>? = configService.getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(application, featureKey)

    @GetMapping("/v1/configurations/{application}/features/{featureKey}/enabled")
    fun getFeatureToggleByApplicationAndFeatureKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String,
    ): FeatureEnabledDTO = configService
        .getFeatureToggle(application, featureKey)
        .let {
            FeatureEnabledDTO(enabled = it?.propertyValue.toBoolean())
        }

    @PostMapping("/v1/configurations/{application}/features/{featureKey}")
    fun saveFeatureToggleByApplicationAndFeatureKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String,
        @RequestBody featureEnabled: FeatureEnabledDTO,
    ): FeatureEnabledDTO = configService
        .setFeatureToggle(application, featureKey, enabled = featureEnabled.enabled)
        .let {
            FeatureEnabledDTO(enabled = it?.propertyValue.toBoolean())
        }

    @DeleteMapping("/v1/configurations/{application}/features/{featureKey}")
    fun deleteConfigurationPropertiesByApplicationAndFeatureKey(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String,
    ) {
        configService.deleteConfigurationPropertiesByApplicationAndFeatureKey(application, featureKey)
    }

    @GetMapping("/v1/configurations/{application}/retired")
    fun getRetiredConfigurationKeys(
        @PathVariable("application") application: String,
    ): List<RetiredConfigurationKeyDTO> = configService
        .getRetiredConfigurationProperties(application)
        .map { RetiredConfigurationKeyDTO(propertyKey = it.propertyKey, retiredIn = it.retiredIn!!) }

    // The key is a query parameter: retired keys can contain "/" (CP 2.0.0 profile names), and the firewall rejects
    // an encoded slash in the path.
    @DeleteMapping("/v1/configurations/{application}/retired", params = ["propertyKey"])
    fun deleteRetiredConfigurationKey(
        @PathVariable("application") application: String,
        @RequestParam("propertyKey") propertyKey: String,
    ): ResponseEntity<Void> = if (configService.deleteRetiredConfigurationProperty(application, propertyKey)) {
        ResponseEntity.noContent().build()
    } else {
        ResponseEntity.notFound().build()
    }

    @DeleteMapping("/v1/configurations/{application}/retired", params = ["retiredIn"])
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteRetiredConfigurationKeys(
        @PathVariable("application") application: String,
        @RequestParam("retiredIn") retiredIn: String,
    ) {
        configService.deleteRetiredConfigurationProperties(application, retiredIn)
    }

    @PostMapping("/v1/configurations")
    fun saveConfigurationProperties(
        @RequestBody configs: List<ConfigurationProperty>,
    ): List<ConfigurationProperty> = configService.saveConfigurationProperties(configs)
}
