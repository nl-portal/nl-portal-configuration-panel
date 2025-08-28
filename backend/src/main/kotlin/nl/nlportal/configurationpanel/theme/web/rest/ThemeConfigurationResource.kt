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
import nl.nlportal.configurationpanel.theme.web.dto.ThemeLogoResponse
import nl.nlportal.configurationpanel.theme.web.dto.ThemeStylesResponse
import org.springframework.http.HttpHeaders.CONTENT_DISPOSITION
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ThemeConfigurationResource(
    private val themeService: ThemeService,
) {
    @GetMapping("/v1/theme/{application}/logo")
    fun getApplicationThemeLogos(
        @PathVariable application: String,
    ): ResponseEntity<List<ThemeLogoResponse>> = ResponseEntity.ok(themeService.getThemeLogosByApplication(application))

    @GetMapping("/v1/theme/{application}/logo/{id}")
    fun getApplicationThemeLogoById(
        @PathVariable application: String,
        @PathVariable id: UUID,
    ): ResponseEntity<ByteArray> {
        return when (val logo = themeService.getThemeLogoByIdOrNull(id)) {
            null -> return ResponseEntity.notFound().build()
            else ->
                ResponseEntity
                    .ok()
                    .header(CONTENT_DISPOSITION, "attachment; filename=${logo.filename}")
                    .body(logo.content)
        }
    }

    @PostMapping("/v1/theme/{application}/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun storeApplicationThemeLogo(
        @RequestParam("file") file: MultipartFile,
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
    ): ResponseEntity<ThemeLogoResponse> =
        themeService
            .saveThemeLogo(file, application, profile, label)
            .let {
                ResponseEntity.ok(
                    ThemeLogoResponse(
                        logoId = it.id,
                        filename = it.filename,
                        size = it.size,
                        contentType = it.mimetype,
                    ),
                )
            }

    @GetMapping("/v1/theme/{application}/styles")
    fun getApplicationThemeStyles(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
    ): ResponseEntity<ThemeStylesResponse> {
        return when (val themeStyle = themeService.getThemeStylesByApplication(application, profile, label)) {
            null -> return ResponseEntity.notFound().build()
            else -> ResponseEntity.ok().body(ThemeStylesResponse(stylesId = themeStyle.id, styles = themeStyle.styles))
        }
    }

    @PostMapping("/v1/theme/{application}/styles", consumes = [MediaType.TEXT_PLAIN_VALUE])
    fun storeApplicationThemeLogo(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
        @RequestBody styles: String,
    ): ResponseEntity<ThemeStylesResponse> =
        themeService
            .saveThemeStyles(styles, application, profile, label)
            .let {
                ResponseEntity.ok(
                    ThemeStylesResponse(
                        stylesId = it.id,
                        styles = styles,
                    ),
                )
            }
}
