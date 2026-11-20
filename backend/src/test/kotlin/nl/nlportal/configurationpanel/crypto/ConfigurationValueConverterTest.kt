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

import nl.nlportal.configurationpanel.crypto.ConfigurationValueEncryptorTest.Companion.VECTOR_KEY
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.support.StaticListableBeanFactory

class ConfigurationValueConverterTest {
    private val encryptor = ConfigurationValueEncryptor(VECTOR_KEY)

    private val enabled = ConfigurationValueConverter(provider(encryptor))
    private val disabled = ConfigurationValueConverter(provider(null))

    @Test
    fun `encrypts on write when encryption is enabled`() {
        val stored = enabled.convertToDatabaseColumn("value")!!

        assertTrue(stored.startsWith("{cipher}"))
        assertEquals("value", encryptor.decrypt(stored))
    }

    @Test
    fun `writes plaintext when encryption is disabled`() {
        assertEquals("value", disabled.convertToDatabaseColumn("value"))
    }

    @Test
    fun `decrypts on read`() {
        assertEquals("value", enabled.convertToEntityAttribute(encryptor.encrypt("value")))
    }

    @Test
    fun `reads plaintext as is`() {
        assertEquals("value", enabled.convertToEntityAttribute("value"))
        assertEquals("value", disabled.convertToEntityAttribute("value"))
    }

    @Test
    fun `passes null through`() {
        assertNull(enabled.convertToDatabaseColumn(null))
        assertNull(enabled.convertToEntityAttribute(null))
    }

    @Test
    fun `reading an encrypted value while encryption is disabled fails`() {
        val exception = assertThrows<IllegalStateException> { disabled.convertToEntityAttribute(encryptor.encrypt("value")) }

        assertEquals("Encrypted configuration value found but encryption is disabled", exception.message)
    }

    private fun provider(encryptor: ConfigurationValueEncryptor?) = StaticListableBeanFactory()
        .apply { encryptor?.let { addBean("configurationValueEncryptor", it) } }
        .getBeanProvider(ConfigurationValueEncryptor::class.java)
}
