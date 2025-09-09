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
import nl.nlportal.configurationpanel.theme.web.dto.ThemeStyleDTO
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
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
    ): ResponseEntity<List<ThemeStyleDTO>> =
        ResponseEntity.ok(
            themeService
                .getThemeStyles(application, profile, label)
                .map { themeStyle ->
                    ThemeStyleDTO.fromThemeStyle(themeStyle)
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

    @PostMapping("/v1/theme/{application}/style")
    fun createThemeStyle(
        @PathVariable application: String,
        @RequestBody themeStyleRequest: ThemeStyleDTO,
    ): ResponseEntity<ThemeStyleDTO> =
        themeService
            .createThemeStyle(themeStyleRequest.styles, application, themeStyleRequest.profile, themeStyleRequest.label)
            .let { themeStyle ->
                ResponseEntity.ok(
                    ThemeStyleDTO.fromThemeStyle(themeStyle),
                )
            }

    @Transactional
    @PutMapping("/v1/theme/{application}/style/{id}", consumes = ["text/css;characterset=utf-8"])
    fun updateThemeStyle(
        @PathVariable application: String,
        @PathVariable id: UUID,
        @RequestBody styles: String,
    ): ResponseEntity<ThemeStyleDTO> =
        themeService
            .updateThemeStyleById(id, styles)
            ?.let { themeStyle ->
                ResponseEntity.ok(
                    ThemeStyleDTO.fromThemeStyle(themeStyle),
                )
            } ?: ResponseEntity.notFound().build()
}
