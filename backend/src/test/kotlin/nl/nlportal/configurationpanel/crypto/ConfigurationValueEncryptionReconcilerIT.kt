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

import liquibase.integration.spring.SpringLiquibase
import nl.nlportal.configurationpanel.crypto.ConfigurationValueEncryptorTest.Companion.VECTOR_KEY
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.support.StaticListableBeanFactory
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.datasource.DataSourceTransactionManager
import org.springframework.jdbc.datasource.SingleConnectionDataSource
import java.util.UUID

/**
 * Runs the reconciler against an H2 nlp_configuration table in each encryption state.
 */
@Tag("integration")
class ConfigurationValueEncryptionReconcilerIT {
    private val encryptor = ConfigurationValueEncryptor(VECTOR_KEY)
    private val dataSource =
        SingleConnectionDataSource("jdbc:h2:mem:${UUID.randomUUID()};MODE=PostgreSQL", true).apply { setAutoCommit(false) }
    private val jdbcTemplate = JdbcTemplate(dataSource)

    @BeforeEach
    fun setUp() {
        jdbcTemplate.execute(
            "CREATE TABLE nlp_configuration (property_key varchar(255) PRIMARY KEY, property_value text, application varchar(255))",
        )
        dataSource.connection.commit()
    }

    @Test
    fun `encrypts plaintext rows when encryption is enabled`() {
        insert("a", "plain")
        insert("b", encryptor.encrypt("already"))
        val alreadyEncrypted = value("b")

        reconciler(encryptor, key = VECTOR_KEY).afterPropertiesSet()

        assertTrue(value("a").startsWith("{cipher}"))
        assertEquals("plain", encryptor.decrypt(value("a")))
        assertEquals(alreadyEncrypted, value("b"))
    }

    @Test
    fun `a second run changes nothing`() {
        insert("a", "plain")
        reconciler(encryptor, key = VECTOR_KEY).afterPropertiesSet()
        val first = value("a")

        reconciler(encryptor, key = VECTOR_KEY).afterPropertiesSet()

        assertEquals(first, value("a"))
    }

    @Test
    fun `decrypts encrypted rows when encryption is disabled and the key is set`() {
        insert("a", encryptor.encrypt("secret"))
        insert("b", "plain")

        reconciler(null, key = VECTOR_KEY).afterPropertiesSet()

        assertEquals("secret", value("a"))
        assertEquals("plain", value("b"))
    }

    @Test
    fun `fails when encryption is disabled, no key is set and encrypted rows exist`() {
        insert("a", encryptor.encrypt("secret"))

        val exception = assertThrows<IllegalStateException> { reconciler(null, key = "").afterPropertiesSet() }

        assertEquals(
            "1 encrypted configuration values found; set CONFIG_ENCRYPTION_KEY to decrypt them or re-enable encryption",
            exception.message,
        )
        assertNotEquals("secret", value("a"))
    }

    @Test
    fun `starts when encryption is disabled, no key is set and every row is plaintext`() {
        insert("a", "plain")

        reconciler(null, key = "").afterPropertiesSet()

        assertEquals("plain", value("a"))
    }

    private fun reconciler(
        encryptor: ConfigurationValueEncryptor?,
        key: String,
    ) = ConfigurationValueEncryptionReconciler(
        encryptor = StaticListableBeanFactory().apply { encryptor?.let { addBean("encryptor", it) } }.getBeanProvider(ConfigurationValueEncryptor::class.java),
        liquibase = StaticListableBeanFactory().getBeanProvider(SpringLiquibase::class.java),
        jdbcTemplate = jdbcTemplate,
        transactionManager = DataSourceTransactionManager(dataSource),
        key = key,
    )

    private fun insert(
        key: String,
        value: String,
    ) {
        jdbcTemplate.update("INSERT INTO nlp_configuration (property_key, property_value, application) VALUES (?, ?, 'app')", key, value)
        dataSource.connection.commit()
    }

    private fun value(key: String): String = jdbcTemplate.queryForObject("SELECT property_value FROM nlp_configuration WHERE property_key = ?", String::class.java, key)!!
}
