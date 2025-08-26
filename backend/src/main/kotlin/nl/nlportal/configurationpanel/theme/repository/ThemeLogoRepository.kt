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

package nl.nlportal.configurationpanel.theme.repository

import nl.nlportal.configurationpanel.theme.domain.ThemeLogo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ThemeLogoRepository : JpaRepository<ThemeLogo, String> {
    fun findAllByApplication(application: String): List<ThemeLogo>

    fun findByApplicationAndProfileAndLabel(
        application: String,
        profile: String?,
        label: String?,
    ): ThemeLogo?

    fun deleteById(id: UUID)

    fun deleteAndFlushById(id: UUID)
}
