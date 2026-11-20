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

package nl.nlportal.configurationpanel.config

import nl.nlportal.configurationpanel.crypto.ConfigurationValueEncryptor
import nl.nlportal.configurationpanel.crypto.ConfigurationValueEncryptorTest.Companion.VECTOR_KEY
import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigurationsRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
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
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.test.web.reactive.server.WebTestClient

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = [
        "spring.liquibase.enabled=true",
        "spring.liquibase.change-log=classpath:/liquibase/config-master.xml",
        // The config server's SQL aliases columns as KEY and VALUE, which are keywords in H2
        "spring.datasource.url=jdbc:h2:mem:;MODE=PostgreSQL;NON_KEYWORDS=KEY,VALUE",
    ],
)
@Tag("integration")
@AutoConfigureWebTestClient
class AllowlistEnvironmentRepositoryIT(
    @Autowired private val webTestClient: WebTestClient,
    @Autowired private val configurationsRepository: ConfigurationsRepository,
    @Autowired private val jdbcTemplate: JdbcTemplate,
) {
    @TestConfiguration
    class TestConfig {
        @Bean
        fun cacheManager(): CacheManager = ConcurrentMapCacheManager("configCache")
    }

    @BeforeEach
    fun setUp() {
        configurationsRepository.deleteAll()
        // Through the repository, not the service: the service would refuse the second key
        configurationsRepository.saveAll(
            listOf(
                ConfigurationProperty(propertyKey = ALLOWED_KEY, propertyValue = "a", application = APPLICATION),
                ConfigurationProperty(propertyKey = DISALLOWED_KEY, propertyValue = "b", application = APPLICATION),
            ),
        )
    }

    @Test
    fun `serves only allowed keys`() {
        webTestClient
            .get()
            .uri("/configuration/$APPLICATION/default")
            .header("X-Config-Token", "SecretTestToken123456")
            .exchange()
            .expectStatus()
            .isOk
            .expectBody()
            .jsonPath("$.name")
            .isEqualTo(APPLICATION)
            .jsonPath("$.propertySources.length()")
            .isEqualTo(1)
            .jsonPath("$.propertySources[0].source['$ALLOWED_KEY']")
            .value(String::class.java) { served ->
                assertTrue(served.startsWith("{cipher}"))
                assertEquals("a", ConfigurationValueEncryptor(VECTOR_KEY).decrypt(served))
            }
            .jsonPath("$.propertySources[0].source['$DISALLOWED_KEY']")
            .doesNotExist()
    }

    @Test
    fun `stores values encrypted`() {
        val stored =
            jdbcTemplate.queryForObject(
                "SELECT property_value FROM nlp_configuration WHERE property_key = ?",
                String::class.java,
                ALLOWED_KEY,
            )!!

        assertTrue(stored.startsWith("{cipher}"))
        assertEquals("a", ConfigurationValueEncryptor(VECTOR_KEY).decrypt(stored))
    }

    private companion object {
        private const val APPLICATION = "nl-portal-app"
        private const val ALLOWED_KEY = "nl-portal.config.a"
        private const val DISALLOWED_KEY = "nl-portal.security.b"
    }
}
