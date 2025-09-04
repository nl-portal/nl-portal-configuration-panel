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

package nl.nlportal.configurationpanel.theme.service

import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.domain.ThemeStyle
import nl.nlportal.configurationpanel.theme.repository.ThemeLogoRepository
import nl.nlportal.configurationpanel.theme.repository.ThemeStyleRepository
import nl.nlportal.configurationpanel.theme.web.dto.ThemeLogoResponse
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

class ThemeService(
    private val themeLogoRepository: ThemeLogoRepository,
    private val themeStylesRepository: ThemeStyleRepository,
) {
    fun getThemeLogosByApplication(application: String): List<ThemeLogoResponse> =
        themeLogoRepository.findAllByApplication(application).map { entry ->
            ThemeLogoResponse(
                logoId = entry.id,
                filename = entry.filename,
                size = entry.size,
                contentType = entry.mimetype,
                application = entry.application,
                profile = entry.profile,
                label = entry.label,
            )
        }

    fun getThemeLogoByIdOrNull(logoId: UUID): ThemeLogo? = themeLogoRepository.findByIdOrNull(logoId)

    fun saveThemeLogo(
        file: MultipartFile,
        application: String,
        profile: String? = null,
        label: String? = null,
    ): ThemeLogo {
        val themeLogo =
            ThemeLogo.fromMultipartFile(
                file,
                application,
                profile,
                label,
            )

        return themeLogoRepository
            .findByApplicationAndProfileAndLabel(
                application,
                profile,
                label,
            )?.let { existing ->
                if (themeLogo != existing) {
                    return themeLogoRepository.save(
                        themeLogo.copy(id = existing.id),
                    )
                } else {
                    return existing
                }
            }
            ?: themeLogoRepository.save(themeLogo)
    }

    fun getThemeStyle(
        application: String,
        profile: String?,
        label: String?,
    ): ThemeStyle? = themeStylesRepository.findByApplicationAndProfileAndLabel(application, profile, label)

    fun saveThemeStyle(
        styles: String,
        application: String,
        profile: String?,
        label: String?,
    ): ThemeStyle {
        val themeStyles =
            ThemeStyle(
                styles = styles,
                application = application,
                profile = profile,
                label = label,
            )

        return themeStylesRepository
            .findByApplicationAndProfileAndLabel(application, profile, label)
            ?.let { existing ->
                if (themeStyles != existing) {
                    return themeStylesRepository.save(themeStyles)
                } else {
                    return existing
                }
            }
            ?: themeStylesRepository.save(themeStyles)
    }

    fun deleteThemeLogoById(id: UUID) = themeLogoRepository.deleteById(id)

    fun deleteThemeStyleById(id: UUID) = themeStylesRepository.deleteById(id)
}
