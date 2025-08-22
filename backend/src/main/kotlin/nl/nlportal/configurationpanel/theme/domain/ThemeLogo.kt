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
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import jakarta.persistence.Table
import jakarta.persistence.UniqueConstraint
import org.apache.hc.client5.http.utils.Base64
import org.springframework.web.multipart.MultipartFile
import java.time.Instant
import java.util.UUID

@Entity
@Table(
    name = "config_theme_logos",
    uniqueConstraints = [UniqueConstraint(columnNames = ["application", "profile", "label"])]
)
data class ThemeLogo(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    val id: UUID,

    @Column(name = "filename", updatable = false, nullable = false)
    val filename: String,

    @Column(name = "mimetype", updatable = false, nullable = false)
    val mimetype: String,

    @Lob
    @Column(name = "content", updatable = false, nullable = false)
    val content: ByteArray,

    @Column(name = "application", updatable = false, nullable = false)
    val application: String = "",

    @Column(name = "profile", nullable = true)
    val profile: String? = null,

    @Column(name = "label", nullable = true)
    val label: String? = null,

    @Column(name = "modified_on")
    val modifiedOn: Instant? = Instant.now(),
) {
    fun toBase64DataUri(): String {
        val base64content = Base64.encodeBase64String(content)

        return "data:$mimetype;base64,$base64content"
    }

    fun toDataUri(): String {
        val stringContent = content.toString(Charsets.UTF_8)

        return "data:$mimetype;$stringContent"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ThemeLogo

        return content.contentEquals(other.content)
    }

    override fun hashCode(): Int {
        return content.contentHashCode()
    }

    companion object {

        @JvmStatic
        fun fromMultipartFile(file: MultipartFile): ThemeLogo {
            return ThemeLogo(
                id = UUID.randomUUID(),
                filename = requireNotNull(file.originalFilename) { "file name must not be null" },
                mimetype = requireNotNull(file.contentType) { "file type must not be null" },
                content = file.bytes,
            )
        }
    }
}
