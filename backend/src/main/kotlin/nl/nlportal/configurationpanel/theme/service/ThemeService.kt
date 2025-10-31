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

import nl.nlportal.configurationpanel.theme.event.ThemeLogoChangedEvent
import nl.nlportal.configurationpanel.event.ThemeStyleChangedEvent
import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.domain.ThemeStyle
import nl.nlportal.configurationpanel.theme.event.ThemeLogoDeletedEvent
import nl.nlportal.configurationpanel.theme.event.ThemeStyleDeletedEvent
import nl.nlportal.configurationpanel.theme.repository.ThemeLogoRepository
import nl.nlportal.configurationpanel.theme.repository.ThemeStyleRepository
import org.springframework.context.ApplicationEventPublisher
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import java.util.UUID

@Service
class ThemeService(
    private val applicationEventPublisher: ApplicationEventPublisher,
    private val themeLogoRepository: ThemeLogoRepository,
    private val themeStyleRepository: ThemeStyleRepository,
) {
    fun getThemeLogos(
        application: String,
        profile: String?,
        label: String?,
    ): List<ThemeLogo> =
        themeLogoRepository
            .findAllByApplicationAndProfileAndLabel(application, profile, label)

    fun getThemeLogoByIdOrNull(logoId: UUID): ThemeLogo? = themeLogoRepository.findByIdOrNull(logoId)

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
                    return themeLogoRepository
                        .save(
                            themeLogo.copy(id = existing.id),
                        ).also { applicationEventPublisher.publishEvent(ThemeLogoChangedEvent(it)) }
                } else {
                    return existing
                }
            }
            ?: themeLogoRepository
                .save(themeLogo)
                .also { applicationEventPublisher.publishEvent(ThemeLogoChangedEvent(it)) }
    }

    @Transactional
    fun deleteThemeLogoById(id: UUID) {
        val themeLogo = themeLogoRepository.findByIdOrNull(id)

        themeLogo?.let {
            themeLogoRepository
                .deleteById(id)
                .also {
                    applicationEventPublisher.publishEvent(ThemeLogoDeletedEvent(themeLogo = themeLogo))
                }
        }
    }

    fun getThemeStyles(
        application: String,
        profile: String?,
        label: String?,
    ): List<ThemeStyle> =
        themeStyleRepository
            .findAllByApplicationAndProfileAndLabel(application, profile, label)

    @Transactional
    fun createThemeStyle(
        styles: String,
        application: String,
        profile: String?,
        label: String?,
    ): ThemeStyle {
        val themeStyle =
            ThemeStyle(
                styles = styles,
                application = application,
                profile = profile,
                label = label,
            )

        val existing = themeStyleRepository.findByApplicationAndProfileAndLabel(application, profile, label)
        return if (themeStyle != existing) {
            themeStyleRepository
                .save(themeStyle)
                .also { applicationEventPublisher.publishEvent(ThemeStyleChangedEvent(it)) }
        } else {
            existing
        }
    }

    @Transactional
    fun updateThemeStyleById(
        styleId: UUID,
        styles: String,
    ): ThemeStyle? {
        return themeStyleRepository
            .findByIdOrNull(styleId)
            ?.let { existing ->
                return themeStyleRepository
                    .save(existing.copy(styles = styles))
                    .also {
                        applicationEventPublisher.publishEvent(ThemeStyleChangedEvent(it))
                    }
            }
    }

    @Transactional
    fun deleteThemeStyleById(id: UUID) {
        val themeStyle = themeStyleRepository.findByIdOrNull(id)

        themeStyle?.let {
            themeStyleRepository
                .deleteById(id)
                .also {
                    applicationEventPublisher.publishEvent(ThemeStyleDeletedEvent(themeStyle = themeStyle))
                }
        }
    }
}
