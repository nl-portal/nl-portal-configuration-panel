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

package nl.nlportal.configurationpanel.theme.configuraiton

import nl.nlportal.configurationpanel.notify.service.NotifyService
import nl.nlportal.configurationpanel.theme.listener.ThemeLogoEntityListener
import nl.nlportal.configurationpanel.theme.repository.ThemeLogoRepository
import nl.nlportal.configurationpanel.theme.repository.ThemeStyleRepository
import nl.nlportal.configurationpanel.theme.service.ThemeService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ThemeConfiguration {
    @Bean
    fun themeService(
        themeLogoRepository: ThemeLogoRepository,
        themeStylesRepository: ThemeStyleRepository,
        notifyService: NotifyService,
    ): ThemeService =
        ThemeService(
            themeLogoRepository = themeLogoRepository,
            themeStylesRepository = themeStylesRepository,
        )

    @Bean
    fun themeLogoEntityListener(): ThemeLogoEntityListener = ThemeLogoEntityListener()
}
