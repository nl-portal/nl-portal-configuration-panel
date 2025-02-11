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

    @GetMapping("/v1/configuration/{application}/{propertyKey}")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("propertyKey") propertyKey: String
    ): ConfigurationProperty? {
        return configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull(application, propertyKey)
    }

    @GetMapping("/v1/configuration/{application}")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        @PathVariable("application") application: String
    ): List<ConfigurationProperty>? {
        return configService.getConfigurationPropertyByApplication(application)
    }

    @PostMapping("/v1/configuration")
    fun addConfigurationProperty(@RequestBody config: ConfigurationProperty): ConfigurationProperty? {
        return configService.addConfigurationProperty(config)
    }
}
