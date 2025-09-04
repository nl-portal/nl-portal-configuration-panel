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

import nl.nlportal.configurationpanel.theme.service.ThemeService
import nl.nlportal.configurationpanel.theme.web.dto.ThemeStyleResponse
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ThemeStyleConfigurationResource(
    private val themeService: ThemeService,
) {
    @GetMapping("/v1/theme/{application}/style")
    fun getThemeStyles(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
    ): ResponseEntity<List<ThemeStyleResponse>> =
        ResponseEntity.ok(
            themeService
                .getThemeStyles(application, profile, label)
                .map { themeStyle ->
                    ThemeStyleResponse.fromThemeStyle(themeStyle)
                },
        )

    @DeleteMapping("/v1/theme/{application}/style/{id}")
    fun deleteThemeStyleById(
        @PathVariable application: String,
        @PathVariable id: UUID,
    ): ResponseEntity<Nothing> {
        themeService.deleteThemeStyleById(id)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/v1/theme/{application}/style", consumes = [MediaType.TEXT_PLAIN_VALUE])
    fun saveThemeStyle(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
        @RequestBody styles: String,
    ): ResponseEntity<ThemeStyleResponse> =
        themeService
            .saveThemeStyle(styles, application, profile, label)
            .let { themeStyle ->
                ResponseEntity.ok(
                    ThemeStyleResponse.fromThemeStyle(themeStyle),
                )
            }
}
