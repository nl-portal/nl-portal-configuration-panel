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
import nl.nlportal.configurationpanel.service.ConfigService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ConfigResource(
    private val configService: ConfigService
) {

    @GetMapping("/v1/configurations/{application}")
    fun getConfigurationPropertiesByApplicationOrNull(
        @PathVariable("application") application: String
    ): List<ConfigurationProperty>? {
        return configService.getConfigurationPropertiesByApplicationOrNull(application)
    }

    @GetMapping("/v1/configurations/{application}/features/{featureKey}")
    fun getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String
    ): List<ConfigurationProperty>? {
        return configService.getConfigurationPropertiesByApplicationAndFeatureKeyOrNull(application, featureKey)
    }

    @DeleteMapping("/v1/configurations/{application}/features/{featureKey}")
    fun deleteConfigurationPropertiesByApplicationAndFeatureKey(
        @PathVariable("application") application: String,
        @PathVariable("featureKey") featureKey: String
    ) {
        configService.deleteConfigurationPropertiesByApplicationAndFeatureKey(application, featureKey)
    }

    @PostMapping("/v1/configurations")
    fun saveConfigurationProperties(@RequestBody configs: List<ConfigurationProperty>): List<ConfigurationProperty> {
        return configService.saveConfigurationProperties(configs)
    }
}
