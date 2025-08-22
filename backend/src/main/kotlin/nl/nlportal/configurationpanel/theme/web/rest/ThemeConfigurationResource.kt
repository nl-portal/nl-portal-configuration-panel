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

package nl.nlportal.configurationpanel.theme.web.rest

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.service.ConfigService
import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.service.ThemeService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ThemeConfigurationResource(
    private val themeService: ThemeService
) {

    @PostMapping("/v1/configurations/{application}/theme/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun storeApplicationThemeLogo(@RequestParam("file") file: MultipartFile): List<ConfigurationProperty> {
        return themeService.saveThemeLogo(file)
    }
}
