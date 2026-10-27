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

package nl.nlportal.configurationpanel.web.rest

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webtestclient.autoconfigure.AutoConfigureWebTestClient
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.http.MediaType
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.test.web.reactive.server.WebTestClient

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = [
        "spring.liquibase.enabled=true",
        "spring.liquibase.change-log=classpath:/liquibase/config-master.xml",
    ],
)
@Tag("integration")
@AutoConfigureWebTestClient
class ConfigurationsResourceIT(
    @Autowired private val webTestClient: WebTestClient,
    @Autowired private val jdbcTemplate: JdbcTemplate,
) {
    @TestConfiguration
    class TestConfig {
        @Bean
        fun cacheManager(): CacheManager = ConcurrentMapCacheManager("configCache")

        @Bean
        fun jwtDecoder(): JwtDecoder = JwtDecoder { token ->
            Jwt
                .withTokenValue(token)
                .header("alg", "none")
                .subject("tester")
                .claim("realm_access", mapOf("roles" to if (token == NO_ROLE_TOKEN) emptyList() else listOf("ROLE_ADMIN")))
                .build()
        }
    }

    @BeforeEach
    fun setUp() {
        jdbcTemplate.update("DELETE FROM nlp_configuration")
        insert("nl-portal.config.zakenapi.properties.url", "https://zgw.example.com", retiredIn = null)
        insert("nl-portal.config.payment.ogone.properties.configurations.main/shop.sha-in-key", "very-secret", retiredIn = "4.0")
        insert("nl-portal.config.theme.style", ":root {}", retiredIn = "4.0")
    }

    @Test
    fun `lists retired keys without values`() {
        webTestClient
            .get()
            .uri("/api/v1/configurations/$APPLICATION/retired")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isOk
            .expectBody()
            .jsonPath("$.length()")
            .isEqualTo(2)
            .jsonPath("$[0].propertyKey")
            .isEqualTo("nl-portal.config.payment.ogone.properties.configurations.main/shop.sha-in-key")
            .jsonPath("$[0].retiredIn")
            .isEqualTo("4.0")
            .jsonPath("$[0].propertyValue")
            .doesNotExist()
            .jsonPath("$[1].propertyKey")
            .isEqualTo("nl-portal.config.theme.style")
    }

    @Test
    fun `feature reads leave out retired keys`() {
        webTestClient
            .get()
            .uri("/api/v1/configurations/$APPLICATION/features/nl-portal.config")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isOk
            .expectBody()
            .jsonPath("$.length()")
            .isEqualTo(1)
            .jsonPath("$[0].propertyKey")
            .isEqualTo("nl-portal.config.zakenapi.properties.url")
    }

    @Test
    fun `deleting a live key as retired is not found`() {
        webTestClient
            .delete()
            .uri("/api/v1/configurations/$APPLICATION/retired?propertyKey={key}", "nl-portal.config.zakenapi.properties.url")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isNotFound

        check(count() == 3)
    }

    @Test
    fun `deletes a retired key`() {
        webTestClient
            .delete()
            .uri("/api/v1/configurations/$APPLICATION/retired?propertyKey={key}", "nl-portal.config.theme.style")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isNoContent

        check(count() == 2)
    }

    @Test
    fun `deletes a retired key containing a slash`() {
        webTestClient
            .delete()
            .uri(
                "/api/v1/configurations/$APPLICATION/retired?propertyKey={key}",
                "nl-portal.config.payment.ogone.properties.configurations.main/shop.sha-in-key",
            ).header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isNoContent

        check(count() == 2)
    }

    @Test
    fun `deletes every retired key of a version`() {
        webTestClient
            .delete()
            .uri("/api/v1/configurations/$APPLICATION/retired?retiredIn=4.0")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isNoContent

        check(count() == 1)
    }

    @Test
    fun `retired endpoints require a token`() {
        webTestClient
            .get()
            .uri("/api/v1/configurations/$APPLICATION/retired")
            .exchange()
            .expectStatus()
            .isUnauthorized
    }

    @Test
    fun `retired endpoints require an allowed authority`() {
        webTestClient
            .get()
            .uri("/api/v1/configurations/$APPLICATION/retired")
            .header("Authorization", "Bearer $NO_ROLE_TOKEN")
            .exchange()
            .expectStatus()
            .isForbidden
    }

    @Test
    fun `session check succeeds with an allowed authority`() {
        webTestClient
            .get()
            .uri("/api/v1/session")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isNoContent
    }

    @Test
    fun `saves keys under an allowed prefix`() {
        save(property("nl-portal.config.zakenapi.properties.client-id", "client"))
            .expectStatus()
            .isOk

        check(count() == 4)
    }

    @Test
    fun `rejects keys outside the allowed prefixes`() {
        save(property("spring.datasource.url", "jdbc:postgresql://evil/db"))
            .expectStatus()
            .isBadRequest

        check(count() == 3)
    }

    @Test
    fun `saves nothing when one key is outside the allowed prefixes`() {
        save(
            property("nl-portal.config.zakenapi.properties.client-id", "client"),
            property("logging.level.root", "DEBUG"),
        ).expectStatus()
            .isBadRequest

        check(count() == 3)
    }

    @Test
    fun `rejects a feature toggle outside the allowed prefixes`() {
        webTestClient
            .post()
            .uri("/api/v1/configurations/$APPLICATION/features/spring")
            .header("Authorization", "Bearer token")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(mapOf("enabled" to true))
            .exchange()
            .expectStatus()
            .isBadRequest

        check(count() == 3)
    }

    @Test
    fun `rejects a feature delete outside the allowed prefixes`() {
        webTestClient
            .delete()
            .uri("/api/v1/configurations/$APPLICATION/features/nl")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isBadRequest

        check(count() == 3)
    }

    private fun save(vararg properties: Map<String, String>) = webTestClient
        .post()
        .uri("/api/v1/configurations")
        .header("Authorization", "Bearer token")
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(properties.toList())
        .exchange()

    private fun property(
        key: String,
        value: String,
    ) = mapOf("propertyKey" to key, "propertyValue" to value, "application" to APPLICATION)

    private fun insert(
        key: String,
        value: String,
        retiredIn: String?,
    ) {
        jdbcTemplate.update(
            "INSERT INTO nlp_configuration (property_key, property_value, application, retired_in) VALUES (?, ?, ?, ?)",
            key,
            value,
            APPLICATION,
            retiredIn,
        )
    }

    private fun count(): Int = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM nlp_configuration", Int::class.java)!!

    companion object {
        private const val APPLICATION = "nl-portal-app"
        private const val NO_ROLE_TOKEN = "no-role"
    }
}
