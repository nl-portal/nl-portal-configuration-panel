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

import jakarta.transaction.Transactional
import nl.nlportal.configurationpanel.service.NotifyService
import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.repository.ThemeLogoRepository
import nl.nlportal.configurationpanel.theme.web.dto.ThemeLogoResponse
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class ThemeService(
    private val themeLogoRepository: ThemeLogoRepository,
    private val notifyService: NotifyService,
) {
    fun getThemeLogosByApplication(application: String): List<ThemeLogoResponse> =
        themeLogoRepository.findAllByApplication(application).map { entry ->
            ThemeLogoResponse(
                logoId = entry.id,
                filename = entry.filename,
                size = entry.size,
                contentType = entry.mimetype,
            )
        }

    fun getThemeLogoByIdOrNull(logoId: UUID): ThemeLogo? = themeLogoRepository.findByIdOrNull(logoId.toString())

    @Transactional
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
                } else return existing
            }
            ?: themeLogoRepository.save(themeLogo)
    }
}
