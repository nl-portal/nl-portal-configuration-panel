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

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class ConfigurationValueEncryptorTest {
    @Test
    fun `round trip`() {
        val encryptor = ConfigurationValueEncryptor(VECTOR_KEY)

        val encrypted = encryptor.encrypt("some value")

        assertTrue(encrypted.startsWith("{cipher}"))
        assertNotEquals("{cipher}some value", encrypted)
        assertEquals("some value", encryptor.decrypt(encrypted))
    }

    @Test
    fun `the cross-repo vector decrypts to the expected plaintext`() {
        assertEquals(VECTOR_PLAINTEXT, ConfigurationValueEncryptor(VECTOR_KEY).decrypt("{cipher}$VECTOR_CIPHERTEXT"))
    }

    @Test
    fun `a wrong key fails with the key mismatch message`() {
        val exception =
            assertThrows<IllegalStateException> {
                ConfigurationValueEncryptor(OTHER_KEY).decrypt("{cipher}$VECTOR_CIPHERTEXT")
            }

        assertTrue(exception.message!!.contains("CONFIG_ENCRYPTION_KEY is not the key it was encrypted with"))
    }

    @Test
    fun `a key that is not 32 bytes is rejected`() {
        val exception = assertThrows<IllegalArgumentException> { ConfigurationValueEncryptor(SHORT_KEY) }

        assertTrue(exception.message!!.contains("32-byte (AES-256) key, got 16 bytes"))
    }

    @Test
    fun `a key that is not Base64 is rejected`() {
        val exception = assertThrows<IllegalArgumentException> { ConfigurationValueEncryptor("not base64!") }

        assertTrue(exception.message!!.contains("CONFIG_ENCRYPTION_KEY must be Base64"))
    }

    @Test
    fun `recognises encrypted values by their prefix`() {
        assertTrue(ConfigurationValueEncryptor.isEncrypted("{cipher}abc"))
        assertFalse(ConfigurationValueEncryptor.isEncrypted("abc"))
        assertFalse(ConfigurationValueEncryptor.isEncrypted(null))
    }

    companion object {
        // Shared with NL Portal's AesGcmTextEncryptorTest; generated once with plain JDK AES/GCM/NoPadding.
        const val VECTOR_KEY = "u8nzUYr3cgDzLfwQE+IWU73QbPFORBBG+hjk1XNiXuI="
        const val VECTOR_CIPHERTEXT =
            "bHvURiubAwRK0j+Ra5eSUSRSwlXHeXJSC8/uH/V9hw84qX+k1GhmuiZ9EJ7KryG+dAYXESNCHyWTov4mNEqcxlMESjRFVvE0UjX16D6AEw=="
        const val VECTOR_PLAINTEXT = "Configuration Panel cross-repo vector: €ü✓"

        private const val OTHER_KEY = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
        private const val SHORT_KEY = "AAAAAAAAAAAAAAAAAAAAAA=="
    }
}
