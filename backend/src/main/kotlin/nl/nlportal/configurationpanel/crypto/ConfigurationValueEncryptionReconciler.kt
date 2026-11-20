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

import io.github.oshai.kotlinlogging.KotlinLogging
import liquibase.integration.spring.SpringLiquibase
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.ObjectProvider
import org.springframework.beans.factory.annotation.Value
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.support.TransactionTemplate

/**
 * Brings `nlp_configuration.property_value` in line with the encryption setting at startup.
 */
@Component
class ConfigurationValueEncryptionReconciler(
    private val encryptor: ObjectProvider<ConfigurationValueEncryptor>,
    // Resolved first so the changelogs, which need plaintext values, have run
    private val liquibase: ObjectProvider<SpringLiquibase>,
    private val jdbcTemplate: JdbcTemplate,
    transactionManager: PlatformTransactionManager,
    @Value("\${configuration-panel.encryption.key:}") private val key: String,
) : InitializingBean {
    private val transactionTemplate = TransactionTemplate(transactionManager)

    override fun afterPropertiesSet() {
        liquibase.ifAvailable
        transactionTemplate.executeWithoutResult { reconcile() }
    }

    private fun reconcile() {
        val enabledEncryptor = encryptor.ifAvailable
        if (enabledEncryptor != null) {
            val encrypted = update(plainRows()) { enabledEncryptor.encrypt(it) }
            logger.info { "Encrypted $encrypted configuration values" }
            return
        }

        val encryptedRows = encryptedRows()
        if (encryptedRows.isEmpty()) return
        check(key.isNotBlank()) {
            "${encryptedRows.size} encrypted configuration values found; set CONFIG_ENCRYPTION_KEY to decrypt them or re-enable encryption"
        }
        val decryptor = ConfigurationValueEncryptor(key)
        val decrypted = update(encryptedRows) { decryptor.decrypt(it) }
        logger.warn { "Encryption disabled: decrypted $decrypted configuration values" }
    }

    private fun plainRows() = rows("property_value NOT LIKE '$CIPHER_PATTERN'")

    private fun encryptedRows() = rows("property_value LIKE '$CIPHER_PATTERN'")

    private fun rows(condition: String): List<Pair<String, String>> = jdbcTemplate.query(
        "SELECT property_key, property_value FROM nlp_configuration WHERE property_value IS NOT NULL AND $condition",
    ) { rs, _ -> rs.getString("property_key") to rs.getString("property_value") }

    private fun update(
        rows: List<Pair<String, String>>,
        transform: (String) -> String,
    ): Int {
        rows.forEach { (propertyKey, value) ->
            jdbcTemplate.update(
                "UPDATE nlp_configuration SET property_value = ? WHERE property_key = ?",
                transform(value),
                propertyKey,
            )
        }
        return rows.size
    }

    private companion object {
        private val logger = KotlinLogging.logger { }

        // LIKE pattern for ConfigurationValueEncryptor.CIPHER_PREFIX; braces are not LIKE wildcards
        private const val CIPHER_PATTERN = "{cipher}%"
    }
}
