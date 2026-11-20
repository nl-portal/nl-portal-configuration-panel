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

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter
import org.springframework.beans.factory.ObjectProvider

/**
 * Encrypts `property_value` on write and decrypts it on read, so the UI and API keep working with plaintext.
 */
@Converter(autoApply = false)
class ConfigurationValueConverter(
    private val encryptor: ObjectProvider<ConfigurationValueEncryptor>,
) : AttributeConverter<String, String> {
    override fun convertToDatabaseColumn(attribute: String?): String? = attribute?.let { value -> encryptor.ifAvailable?.encrypt(value) ?: value }

    override fun convertToEntityAttribute(dbData: String?): String? {
        if (dbData == null || !ConfigurationValueEncryptor.isEncrypted(dbData)) return dbData
        val available =
            encryptor.ifAvailable
                ?: throw IllegalStateException("Encrypted configuration value found but encryption is disabled")
        return available.decrypt(dbData)
    }
}
