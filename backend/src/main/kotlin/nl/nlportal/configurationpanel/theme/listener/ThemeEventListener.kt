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

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.event.ThemeLogoChangedEvent
import nl.nlportal.configurationpanel.event.ThemeStyleChangedEvent
import nl.nlportal.configurationpanel.service.ConfigurationPropertiesService
import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.domain.ThemeStyle
import nl.nlportal.configurationpanel.theme.event.ThemeLogoDeletedEvent
import nl.nlportal.configurationpanel.theme.event.ThemeStyleDeletedEvent
import org.springframework.transaction.event.TransactionPhase
import org.springframework.transaction.event.TransactionalEventListener

class ThemeEventListener(
    private val configurationPropertiesService: ConfigurationPropertiesService,
) {
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    fun handleThemeStyleChangedEvent(event: ThemeLogoChangedEvent) {
        configurationPropertiesService.saveConfigurationProperty(
            ConfigurationProperty(
                propertyKey = "nl-portal.config.theme.logo",
                propertyValue = event.themeLogo.asBase64DataUri(),
                application = event.themeLogo.application,
                profile = event.themeLogo.profile,
                label = event.themeLogo.label,
            ),
        )
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    fun handleThemeStyleChangedEvent(event: ThemeStyleChangedEvent) {
        configurationPropertiesService.saveConfigurationProperty(
            ConfigurationProperty(
                propertyKey = "nl-portal.config.theme.style",
                propertyValue = event.themeStyle.styles,
                application = event.themeStyle.application,
                profile = event.themeStyle.profile,
                label = event.themeStyle.label,
            ),
        )
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    fun handleThemeLogoDeletedEvent(event: ThemeLogoDeletedEvent) =
        configurationPropertiesService
            .deleteConfigurationPropertiesByApplicationAndFeatureKey(
                application = event.themeLogo.application,
                featureKey = ThemeLogo.THEME_LOGO_CONFIGURATION_PROPERTY_KEY,
            )

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    fun handleThemeStyleDeletedEvent(event: ThemeStyleDeletedEvent) =
        configurationPropertiesService
            .deleteConfigurationPropertiesByApplicationAndFeatureKey(
                application = event.themeStyle.application,
                featureKey = ThemeStyle.THEME_STYLE_CONFIGURATION_PROPERTY_KEY,
            )
}
