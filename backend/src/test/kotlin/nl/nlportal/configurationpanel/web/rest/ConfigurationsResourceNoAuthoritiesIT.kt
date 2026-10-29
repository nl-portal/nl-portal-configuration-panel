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

import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webtestclient.autoconfigure.AutoConfigureWebTestClient
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.test.web.reactive.server.WebTestClient

@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
    properties = [
        "spring.liquibase.enabled=true",
        "spring.liquibase.change-log=classpath:/liquibase/config-master.xml",
        "configuration-panel.security.authorities=\${CONFIG_SECURITY_API_AUTHORITIES:ROLE_ADMIN}",
        "CONFIG_SECURITY_API_AUTHORITIES=",
    ],
)
@Tag("integration")
@AutoConfigureWebTestClient
class ConfigurationsResourceNoAuthoritiesIT(
    @Autowired private val webTestClient: WebTestClient,
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
                .claim("realm_access", mapOf("roles" to listOf("ROLE_ADMIN")))
                .build()
        }
    }

    @Test
    fun `empty authorities deny every request`() {
        webTestClient
            .get()
            .uri("/api/v1/configurations/nl-portal-app/retired")
            .header("Authorization", "Bearer token")
            .exchange()
            .expectStatus()
            .isForbidden
    }
}
