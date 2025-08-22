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

import nl.nlportal.configurationpanel.service.NotifyService
import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import nl.nlportal.configurationpanel.theme.repository.ThemeLogoRepository
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class ThemeService(
    private val themeLogoRepository: ThemeLogoRepository,
    private val notifyService: NotifyService
) {
    fun saveThemeLogo(file: MultipartFile): ThemeLogo {
        return themeLogoRepository.save(ThemeLogo.fromMultipartFile(file))
    }
}
