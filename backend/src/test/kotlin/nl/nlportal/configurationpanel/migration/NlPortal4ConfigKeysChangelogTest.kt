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

package nl.nlportal.configurationpanel.migration

import liquibase.Scope
import liquibase.command.CommandScope
import liquibase.command.core.UpdateCommandStep
import liquibase.command.core.helpers.DbUrlConnectionArgumentsCommandStep
import liquibase.database.DatabaseFactory
import liquibase.database.jvm.JdbcConnection
import liquibase.resource.ClassLoaderResourceAccessor
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.sql.Connection
import java.sql.DriverManager
import java.util.UUID

/**
 * Applies the committed NL Portal 4.0 changelog to a configuration panel 2.0.0-shaped database.
 */
class NlPortal4ConfigKeysChangelogTest {
    private lateinit var connection: Connection

    @BeforeEach
    fun setUp() {
        connection = DriverManager.getConnection("jdbc:h2:mem:${UUID.randomUUID()};MODE=PostgreSQL")
        update("liquibase/changelog/20240206-add-config-table.xml")
    }

    @AfterEach
    fun tearDown() {
        connection.close()
    }

    @Test
    fun `copies moved keys and retires the old ones`() {
        seed(ZAAK_DOCUMENTEN_VERTROUWELIJKHEID, "openbaar, intern")
        seed(ZAAK_DOCUMENTEN_STATUS, "")
        seed("nl-portal.config.theme.logo", "data:image/png;base64,AAAA", profile = "default", label = "main")
        seed("nl-portal.config.theme.style", ":root { --x: 1; }")

        update(CHANGELOG)

        assertEquals("openbaar, intern", value(DOCUMENTEN_VERTROUWELIJKHEID))
        assertEquals("", value(DOCUMENTEN_STATUS))
        assertEquals("data:image/png;base64,AAAA", value("nl-portal.frontend.theme.logo"))
        assertEquals(listOf("default", "main"), profileAndLabel("nl-portal.frontend.theme.logo"))
        assertEquals(":root { --x: 1; }", value("nl-portal.frontend.theme.style"))

        listOf(ZAAK_DOCUMENTEN_VERTROUWELIJKHEID, ZAAK_DOCUMENTEN_STATUS, "nl-portal.config.theme.logo", "nl-portal.config.theme.style")
            .forEach { assertEquals("4.0", retiredIn(it), it) }
        listOf(DOCUMENTEN_VERTROUWELIJKHEID, DOCUMENTEN_STATUS, "nl-portal.frontend.theme.logo", "nl-portal.frontend.theme.style")
            .forEach { assertNull(retiredIn(it), it) }
    }

    @Test
    fun `does not overwrite an existing new key`() {
        seed(ZAAK_DOCUMENTEN_STATUS, "definitief")
        seed(DOCUMENTEN_STATUS, "GEARCHIVEERD")

        update(CHANGELOG)

        assertEquals("GEARCHIVEERD", value(DOCUMENTEN_STATUS))
        assertEquals("definitief", value(ZAAK_DOCUMENTEN_STATUS))
    }

    @Test
    fun `retires removed modules and openproducten without copying them`() {
        seed("nl-portal.config.openproducten.enabled", "true")
        seed("nl-portal.config.openproducten.properties.token", "secret")
        seed("nl-portal.config.haalcentraal.brp.properties.url", "https://brp.example.com")
        seed("nl-portal.config.payment.ogone.properties.configurations.default.sha-in-key", "secret")
        seed("nl-portal.config.zakenapi.properties.url", "https://zgw.example.com")

        update(CHANGELOG)

        assertEquals(0, count("nl-portal.config.openproduct.%"))
        listOf(
            "nl-portal.config.openproducten.enabled",
            "nl-portal.config.openproducten.properties.token",
            "nl-portal.config.haalcentraal.brp.properties.url",
            "nl-portal.config.payment.ogone.properties.configurations.default.sha-in-key",
        ).forEach { assertEquals("4.0", retiredIn(it), it) }
        assertNull(retiredIn("nl-portal.config.zakenapi.properties.url"))
    }

    @Test
    fun `maps payment languages and leaves other values alone`() {
        seed("$PAYMENT_PROFILES.a.language", "nl-NL")
        seed("$PAYMENT_PROFILES.b.language", "en-GB")
        seed("$PAYMENT_PROFILES.c.language", "de_DE")
        seed("$PAYMENT_PROFILES.a.currency", "nl-NL")

        update(CHANGELOG)

        assertEquals("nl_NL", value("$PAYMENT_PROFILES.a.language"))
        assertEquals("en_GB", value("$PAYMENT_PROFILES.b.language"))
        assertEquals("de_DE", value("$PAYMENT_PROFILES.c.language"))
        assertEquals("nl-NL", value("$PAYMENT_PROFILES.a.currency"))
    }

    @Test
    fun `a second update is a no-op`() {
        seed(ZAAK_DOCUMENTEN_STATUS, "definitief")
        update(CHANGELOG)
        val changeSets = countChangeSets()
        val rows = count("%")

        update(CHANGELOG)

        assertEquals(changeSets, countChangeSets())
        assertEquals(rows, count("%"))
        assertEquals("definitief", value(DOCUMENTEN_STATUS))
    }

    private fun update(changelog: String) {
        val database = DatabaseFactory.getInstance().findCorrectDatabaseImplementation(JdbcConnection(connection))
        Scope.child(mapOf(Scope.Attr.resourceAccessor.name to ClassLoaderResourceAccessor())) {
            CommandScope(*UpdateCommandStep.COMMAND_NAME)
                .addArgumentValue(DbUrlConnectionArgumentsCommandStep.DATABASE_ARG, database)
                .addArgumentValue(UpdateCommandStep.CHANGELOG_FILE_ARG, changelog)
                .execute()
        }
    }

    private fun seed(
        key: String,
        value: String,
        profile: String? = null,
        label: String? = null,
    ) {
        connection
            .prepareStatement("INSERT INTO nlp_configuration (property_key, property_value, application, profile, label) VALUES (?, ?, 'nl-portal-app', ?, ?)")
            .use {
                it.setString(1, key)
                it.setString(2, value)
                it.setString(3, profile)
                it.setString(4, label)
                it.executeUpdate()
            }
    }

    private fun <T> queryOne(
        sql: String,
        parameter: String,
        read: (java.sql.ResultSet) -> T,
    ): T = connection.prepareStatement(sql).use { statement ->
        statement.setString(1, parameter)
        statement.executeQuery().use { result ->
            check(result.next()) { "No row for $parameter" }
            read(result)
        }
    }

    private fun value(key: String): String = queryOne("SELECT property_value FROM nlp_configuration WHERE property_key = ?", key) { it.getString(1) }

    private fun retiredIn(key: String): String? = queryOne("SELECT retired_in FROM nlp_configuration WHERE property_key = ?", key) { it.getString(1) }

    private fun profileAndLabel(key: String): List<String?> = queryOne("SELECT profile, label FROM nlp_configuration WHERE property_key = ?", key) { listOf(it.getString(1), it.getString(2)) }

    private fun count(keyPattern: String): Int = queryOne("SELECT COUNT(*) FROM nlp_configuration WHERE property_key LIKE ?", keyPattern) { it.getInt(1) }

    private fun countChangeSets(): Int = connection.createStatement().use { statement ->
        statement.executeQuery("SELECT COUNT(*) FROM databasechangelog").use { result ->
            result.next()
            result.getInt(1)
        }
    }

    companion object {
        private const val CHANGELOG = "liquibase/changelog/20261014-nlp4-config-keys.xml"
        private const val ZAAK_DOCUMENTEN_VERTROUWELIJKHEID =
            "nl-portal.config.zakenapi.properties.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist"
        private const val ZAAK_DOCUMENTEN_STATUS = "nl-portal.config.zakenapi.properties.zaak-documenten-config.status-whitelist"
        private const val DOCUMENTEN_VERTROUWELIJKHEID = "nl-portal.config.documentenapis.properties.vertrouwelijkheidsaanduiding-whitelist"
        private const val DOCUMENTEN_STATUS = "nl-portal.config.documentenapis.properties.status-whitelist"
        private const val PAYMENT_PROFILES = "nl-portal.config.payment.direct.properties.configurations"
    }
}
