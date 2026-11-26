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

package nl.nlportal.configurationpanel.crypto

import org.springframework.security.crypto.encrypt.AesGcmBytesEncryptor
import java.util.Base64
import javax.crypto.spec.SecretKeySpec
import kotlin.text.Charsets.UTF_8

/**
 * AES-256-GCM encryption of configuration values, stored and served as `{cipher}` + Base64(IV ‖ ciphertext ‖ tag).
 * Must stay byte-compatible with NL Portal's AesGcmTextEncryptor, which decrypts the served values.
 */
class ConfigurationValueEncryptor(
    base64Key: String,
) {
    private val encryptor =
        AesGcmBytesEncryptor
            .withSecretKey(SecretKeySpec(decodeKey(base64Key), "AES"))
            .build()

    fun encrypt(plainText: String): String = CIPHER_PREFIX + Base64.getEncoder().encodeToString(encryptor.encrypt(plainText.toByteArray(UTF_8)))

    fun decrypt(value: String): String = try {
        String(encryptor.decrypt(Base64.getDecoder().decode(value.removePrefix(CIPHER_PREFIX))), UTF_8)
    } catch (e: Exception) {
        throw IllegalStateException("Cannot decrypt configuration value: CONFIG_ENCRYPTION_KEY is not the key it was encrypted with", e)
    }

    private fun decodeKey(base64Key: String): ByteArray {
        val key =
            try {
                Base64.getDecoder().decode(base64Key)
            } catch (e: IllegalArgumentException) {
                throw IllegalArgumentException("CONFIG_ENCRYPTION_KEY must be Base64", e)
            }
        require(key.size == KEY_LENGTH_BYTES) {
            "CONFIG_ENCRYPTION_KEY must be a Base64-encoded $KEY_LENGTH_BYTES-byte (AES-256) key, got ${key.size} bytes"
        }
        return key
    }

    companion object {
        const val CIPHER_PREFIX = "{cipher}"
        private const val KEY_LENGTH_BYTES = 32

        fun isEncrypted(value: String?) = value?.startsWith(CIPHER_PREFIX) == true
    }
}
