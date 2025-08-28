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

package nl.nlportal.configurationpanel.theme.listener

import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.persistence.PrePersist
import jakarta.persistence.PreUpdate
import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.provider.SpringContextProvider
import nl.nlportal.configurationpanel.service.ConfigurationsService
import nl.nlportal.configurationpanel.theme.domain.ThemeStyles

class ThemeStylesEntityListener {
    @PrePersist
    @PreUpdate
    fun storeLogoAsConfiguration(themeStyles: ThemeStyles) {
        val configurationsService = SpringContextProvider.getBean(ConfigurationsService::class.java)
        val configurationProperty =
            ConfigurationProperty(
                propertyKey = THEME_STYLES_CONFIGURATION_PROPERTY_KEY,
                propertyValue = themeStyles.styles,
                application = themeStyles.application,
                profile = themeStyles.profile,
                label = themeStyles.label,
            ).also {
                logger.debug { "Attempting to save Theme Styles Configuration for Application: ${it.application}" }
            }

        configurationsService.saveConfigurationProperty(configurationProperty)?.also {
            logger.info { "Saved Theme Styles Configuration for Application: ${it.application}" }
        }
    }

    companion object {
        const val THEME_STYLES_CONFIGURATION_PROPERTY_KEY = "nl-portal.config.theme.styles"
        private val logger = KotlinLogging.logger {}
    }
}
