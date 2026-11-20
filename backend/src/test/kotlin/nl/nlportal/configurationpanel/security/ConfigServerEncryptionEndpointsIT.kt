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

package nl.nlportal.configurationpanel.security

import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webtestclient.autoconfigure.AutoConfigureWebTestClient
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
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
class ConfigServerEncryptionEndpointsIT(
    @Autowired private val webTestClient: WebTestClient,
) {
    @TestConfiguration
    class TestConfig {
        @Bean
        fun cacheManager(): CacheManager = ConcurrentMapCacheManager("configCache")
    }

    @Test
    fun `encrypt is denied`() = expectForbidden(HttpMethod.POST, "/configuration/encrypt")

    @Test
    fun `decrypt is denied`() = expectForbidden(HttpMethod.POST, "/configuration/decrypt")

    @Test
    fun `encrypt for an application is denied`() = expectForbidden(HttpMethod.POST, "/configuration/encrypt/nl-portal-app/default")

    @Test
    fun `encrypt status is denied`() = expectForbidden(HttpMethod.GET, "/configuration/encrypt/status")

    @Test
    fun `key is denied`() = expectForbidden(HttpMethod.GET, "/configuration/key")

    @Test
    fun `configuration is still served`() {
        webTestClient
            .get()
            .uri("/configuration/nl-portal-app/default")
            .header("X-Config-Token", TOKEN)
            .exchange()
            .expectStatus()
            .isOk
    }

    private fun expectForbidden(
        method: HttpMethod,
        uri: String,
    ) {
        webTestClient
            .method(method)
            .uri(uri)
            .header("X-Config-Token", TOKEN)
            .contentType(MediaType.TEXT_PLAIN)
            .bodyValue("value")
            .exchange()
            .expectStatus()
            .isForbidden
    }

    private companion object {
        private const val TOKEN = "SecretTestToken123456"
    }
}
