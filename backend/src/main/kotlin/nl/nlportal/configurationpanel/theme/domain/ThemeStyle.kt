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

package nl.nlportal.configurationpanel.theme.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EntityListeners
import jakarta.persistence.Id
import jakarta.persistence.Table
import nl.nlportal.configurationpanel.theme.listener.ThemeStylesEntityListener
import java.time.Instant
import java.util.UUID

@Entity
@EntityListeners(ThemeStylesEntityListener::class)
@Table(
    name = "nlp_theme_style",
)
data class ThemeStyle(
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    val id: UUID = UUID.randomUUID(),
    @Column(name = "styles", updatable = true, nullable = false)
    val styles: String = "",
    @Column(name = "application", updatable = false, nullable = false)
    val application: String = "",
    @Column(name = "profile", updatable = false, nullable = true)
    val profile: String? = null,
    @Column(name = "label", updatable = false, nullable = true)
    val label: String? = null,
    @Column(name = "modified_on")
    val modifiedOn: Instant? = Instant.now(),
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ThemeStyle

        if (styles != other.styles) return false
        if (application != other.application) return false
        if (profile != other.profile) return false
        if (label != other.label) return false

        return true
    }

    override fun hashCode(): Int {
        var result = styles.hashCode()
        result = 31 * result + application.hashCode()
        result = 31 * result + (profile?.hashCode() ?: 0)
        result = 31 * result + (label?.hashCode() ?: 0)
        return result
    }
}
