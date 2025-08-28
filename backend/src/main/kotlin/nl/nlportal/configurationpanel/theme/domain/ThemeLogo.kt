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
import nl.nlportal.configurationpanel.theme.listener.ThemeLogoEntityListener
import org.apache.hc.client5.http.utils.Base64
import org.apache.tika.Tika
import org.springframework.web.multipart.MultipartFile
import java.time.Instant
import java.util.UUID

@Entity
@EntityListeners(ThemeLogoEntityListener::class)
@Table(
    name = "nlp_theme_logos",
)
data class ThemeLogo(
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    val id: UUID = UUID.randomUUID(),
    @Column(name = "filename", updatable = true, nullable = false)
    val filename: String = "",
    @Column(name = "mimetype", updatable = true, nullable = false)
    val mimetype: String = "",
    @Column(name = "size", updatable = true, nullable = false)
    val size: Long = 0,
    @Column(name = "content", columnDefinition = "bytea", updatable = true, nullable = false)
    val content: ByteArray = byteArrayOf(),
    @Column(name = "application", updatable = false, nullable = false)
    val application: String = "",
    @Column(name = "profile", updatable = false, nullable = true)
    val profile: String? = null,
    @Column(name = "label", updatable = false, nullable = true)
    val label: String? = null,
    @Column(name = "modified_on")
    val modifiedOn: Instant? = Instant.now(),
) {
    fun asBase64DataUri(): String {
        val base64content = Base64.encodeBase64String(content)

        return "data:$mimetype;base64,$base64content"
    }

    fun asDataUri(): String {
        val stringContent = content.toString(Charsets.UTF_8)

        return "data:$mimetype;$stringContent"
    }

    override fun hashCode(): Int = content.contentHashCode()

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ThemeLogo

        if (size != other.size) return false
        if (filename != other.filename) return false
        if (mimetype != other.mimetype) return false
        if (!content.contentEquals(other.content)) return false

        return true
    }

    companion object {
        @JvmStatic
        fun fromMultipartFile(
            file: MultipartFile,
            application: String,
            profile: String? = null,
            label: String? = null,
        ): ThemeLogo =
            ThemeLogo(
                filename = requireNotNull(file.originalFilename) { "file name must not be null" },
                mimetype = Tika().detect(file.bytes),
                size = file.size,
                content = file.bytes,
                application = application,
                profile = profile,
                label = label,
            )
    }
}
