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
import nl.nlportal.configurationpanel.theme.web.dto.ThemeStyleResponse
import org.springframework.http.HttpHeaders.CONTENT_DISPOSITION
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
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ThemeConfigurationResource(
    private val themeService: ThemeService,
) {
    @GetMapping("/v1/theme/{application}/logo")
    fun getThemeLogos(
        @PathVariable application: String,
    ): ResponseEntity<List<ThemeLogoResponse>> = ResponseEntity.ok(themeService.getThemeLogosByApplication(application))

    @GetMapping("/v1/theme/{application}/logo/{id}")
    fun getThemeLogoById(
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

    @DeleteMapping("/v1/theme/{application}/logo/{id}")
    fun deleteThemeLogoById(
        @PathVariable application: String,
        @PathVariable id: UUID,
    ): ResponseEntity<Nothing> =
        when (runCatching { themeService.deleteThemeLogoById(id) }.isSuccess) {
            false -> ResponseEntity.internalServerError().build()
            true -> ResponseEntity.ok().build()
        }

    @PostMapping("/v1/theme/{application}/logo", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun storeThemeLogo(
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
                        application = it.application,
                        profile = it.profile,
                        label = it.label,
                    ),
                )
            }

    @GetMapping("/v1/theme/{application}/styles")
    fun getThemeStyle(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
    ): ResponseEntity<ThemeStyleResponse> {
        return when (val themeStyle = themeService.getThemeStyle(application, profile, label)) {
            null -> return ResponseEntity.notFound().build()
            else ->
                ResponseEntity.ok().body(
                    ThemeStyleResponse(
                        stylesId = themeStyle.id,
                        styles = themeStyle.styles,
                        application = themeStyle.application,
                        profile = themeStyle.profile,
                        label = themeStyle.label,
                    ),
                )
        }
    }

    @DeleteMapping("/v1/theme/{application}/style/{id}")
    fun deleteThemeStyleById(
        @PathVariable application: String,
        @PathVariable id: UUID,
    ): ResponseEntity<Nothing> =
        when (runCatching { themeService.deleteThemeStyleById(id) }.isSuccess) {
            false -> ResponseEntity.internalServerError().build()
            true -> ResponseEntity.ok().build()
        }

    @PostMapping("/v1/theme/{application}/styles", consumes = [MediaType.TEXT_PLAIN_VALUE])
    fun saveThemeStyle(
        @PathVariable application: String,
        @RequestParam profile: String? = null,
        @RequestParam label: String? = null,
        @RequestBody styles: String,
    ): ResponseEntity<ThemeStyleResponse> =
        themeService
            .saveThemeStyle(styles, application, profile, label)
            .let {
                ResponseEntity.ok(
                    ThemeStyleResponse(
                        stylesId = it.id,
                        styles = styles,
                        application = it.application,
                        profile = it.profile,
                        label = it.label,
                    ),
                )
            }
}
