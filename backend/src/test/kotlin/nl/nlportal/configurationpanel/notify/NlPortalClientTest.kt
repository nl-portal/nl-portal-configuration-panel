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

package nl.nlportal.configurationpanel.notify

import mockwebserver3.Dispatcher
import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import mockwebserver3.RecordedRequest
import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfigurationProperties
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.security.oauth2.core.OAuth2AuthorizationException
import org.springframework.web.client.ResourceAccessException
import java.time.Duration
import java.util.Base64
import java.util.concurrent.ConcurrentLinkedQueue
import java.util.concurrent.TimeUnit

class NlPortalClientTest {
    private lateinit var server: MockWebServer
    private val requests = ConcurrentLinkedQueue<RecordedRequest>()

    @Volatile
    private var tokenResponse: MockResponse = tokenResponse()

    @Volatile
    private var actuatorResponse: MockResponse = MockResponse.Builder().code(200).build()

    @BeforeEach
    fun setUp() {
        server =
            MockWebServer().apply {
                dispatcher =
                    object : Dispatcher() {
                        override fun dispatch(request: RecordedRequest): MockResponse {
                            requests.add(request)
                            return if (request.url.encodedPath == TOKEN_PATH) tokenResponse else actuatorResponse
                        }
                    }
                start()
            }
    }

    @AfterEach
    fun tearDown() {
        server.close()
    }

    @Test
    fun `refresh requests a client-credentials token and sends it as bearer`() {
        client().refreshNlPortalClient(baseUrl())

        val (token, actuator) = requests.toList()
        assertEquals("POST", token.method)
        assertEquals(TOKEN_PATH, token.url.encodedPath)
        assertTrue(token.body!!.utf8().contains("grant_type=client_credentials"))
        assertEquals("Basic ${Base64.getEncoder().encodeToString("panel:secret".toByteArray())}", token.headers["Authorization"])
        assertEquals("POST", actuator.method)
        assertEquals("/actuator/refresh", actuator.url.encodedPath)
        assertEquals("Bearer $ACCESS_TOKEN", actuator.headers["Authorization"])
    }

    @Test
    fun `restart sends the bearer token to the restart endpoint`() {
        client().restartNlPortalClient(baseUrl())

        val actuator = requests.last()
        assertEquals("/actuator/restart", actuator.url.encodedPath)
        assertEquals("Bearer $ACCESS_TOKEN", actuator.headers["Authorization"])
    }

    @Test
    fun `reuses the token for the next notify`() {
        val client = client()

        client.refreshNlPortalClient(baseUrl())
        client.restartNlPortalClient(baseUrl())

        assertEquals(1, requests.count { it.url.encodedPath == TOKEN_PATH })
        assertEquals(3, requests.size)
    }

    @Test
    fun `sends the configured scope`() {
        client(scope = listOf("nl-portal-actuator")).refreshNlPortalClient(baseUrl())

        assertTrue(requests.first().body!!.utf8().contains("scope=nl-portal-actuator"))
    }

    @Test
    fun `sends no scope when none is configured`() {
        client().refreshNlPortalClient(baseUrl())

        assertFalse(requests.first().body!!.utf8().contains("scope"))
    }

    @Test
    fun `a refused token request fails with an authorization exception`() {
        tokenResponse =
            MockResponse
                .Builder()
                .code(401)
                .setHeader("Content-Type", "application/json")
                .body("""{"error":"invalid_client"}""")
                .build()

        assertThrows<OAuth2AuthorizationException> { client().refreshNlPortalClient(baseUrl()) }
        assertEquals(1, requests.size)
    }

    @Test
    fun `a slow actuator fails after the read timeout`() {
        actuatorResponse = MockResponse.Builder().code(200).headersDelay(2, TimeUnit.SECONDS).build()

        val started = System.nanoTime()
        assertThrows<ResourceAccessException> { client(readTimeout = Duration.ofMillis(200)).refreshNlPortalClient(baseUrl()) }

        assertTrue(Duration.ofNanos(System.nanoTime() - started) < Duration.ofMillis(1500))
    }

    @Test
    fun `a slow token endpoint fails after the read timeout`() {
        tokenResponse = tokenResponse().newBuilder().headersDelay(2, TimeUnit.SECONDS).build()

        val started = System.nanoTime()
        assertThrows<OAuth2AuthorizationException> { client(readTimeout = Duration.ofMillis(200)).refreshNlPortalClient(baseUrl()) }

        assertTrue(Duration.ofNanos(System.nanoTime() - started) < Duration.ofMillis(1500))
    }

    private fun client(
        scope: List<String> = emptyList(),
        readTimeout: Duration = Duration.ofSeconds(10),
    ) = NlPortalClient(
        ConfigurationPanelNotifyConfigurationProperties(
            readTimeout = readTimeout,
            client =
            ConfigurationPanelNotifyConfigurationProperties.Client(
                tokenUri = server.url(TOKEN_PATH).toString(),
                clientId = "panel",
                clientSecret = "secret",
                scope = scope,
            ),
        ),
    )

    private fun baseUrl() = server.url("/").toString()

    private companion object {
        private const val TOKEN_PATH = "/token"
        private const val ACCESS_TOKEN = "service-token"

        private fun tokenResponse() = MockResponse
            .Builder()
            .code(200)
            .setHeader("Content-Type", "application/json")
            .body("""{"access_token":"$ACCESS_TOKEN","token_type":"Bearer","expires_in":300}""")
            .build()
    }
}
