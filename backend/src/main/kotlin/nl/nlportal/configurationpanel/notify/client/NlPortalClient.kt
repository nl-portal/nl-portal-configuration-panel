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

package nl.nlportal.configurationpanel.notify.client

import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfigurationProperties
import org.springframework.http.MediaType
import org.springframework.http.client.ClientHttpRequestFactory
import org.springframework.http.client.SimpleClientHttpRequestFactory
import org.springframework.http.converter.FormHttpMessageConverter
import org.springframework.security.oauth2.client.AuthorizedClientServiceOAuth2AuthorizedClientManager
import org.springframework.security.oauth2.client.ClientCredentialsOAuth2AuthorizedClientProvider
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager
import org.springframework.security.oauth2.client.endpoint.RestClientClientCredentialsTokenResponseClient
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler
import org.springframework.security.oauth2.client.registration.ClientRegistration
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository
import org.springframework.security.oauth2.client.web.client.OAuth2ClientHttpRequestInterceptor
import org.springframework.security.oauth2.core.AuthorizationGrantType
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter
import org.springframework.web.client.RestClient
import org.springframework.web.util.UriComponentsBuilder

/**
 * Calls NL Portal's actuator with a service token from the OAuth2 client-credentials grant.
 */
class NlPortalClient(
    properties: ConfigurationPanelNotifyConfigurationProperties,
) {
    // Shared by the token request and the actuator calls: notify runs on the admin's save request
    private val requestFactory =
        SimpleClientHttpRequestFactory().apply {
            setConnectTimeout(properties.connectTimeout)
            setReadTimeout(properties.readTimeout)
        }

    private val restClient =
        RestClient
            .builder()
            .requestFactory(requestFactory)
            .requestInterceptor(
                OAuth2ClientHttpRequestInterceptor(authorizedClientManager(properties.client, requestFactory)).apply {
                    setClientRegistrationIdResolver { REGISTRATION_ID }
                    // One shared service token for every admin, not one per logged-in user
                    setPrincipalResolver { null }
                },
            ).build()

    fun restartNlPortalClient(nlPortalBaseUrl: String) = post(nlPortalBaseUrl, "/actuator/restart")

    fun refreshNlPortalClient(nlPortalBaseUrl: String) = post(nlPortalBaseUrl, "/actuator/refresh")

    private fun post(
        nlPortalBaseUrl: String,
        path: String,
    ) {
        restClient
            .post()
            .uri(UriComponentsBuilder.fromUriString(nlPortalBaseUrl).path(path).build().toUri())
            .body(emptyMap<String, String>())
            .contentType(MediaType.APPLICATION_JSON)
            .retrieve()
            .toBodilessEntity()
    }

    private companion object {
        private const val REGISTRATION_ID = "nl-portal-notify"

        private fun authorizedClientManager(
            client: ConfigurationPanelNotifyConfigurationProperties.Client,
            requestFactory: ClientHttpRequestFactory,
        ): OAuth2AuthorizedClientManager {
            val registration =
                ClientRegistration
                    .withRegistrationId(REGISTRATION_ID)
                    .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                    .tokenUri(requireNotNull(client.tokenUri))
                    .clientId(requireNotNull(client.clientId))
                    .clientSecret(requireNotNull(client.clientSecret))
                    .scope(client.scope.map { it.trim() }.filter { it.isNotBlank() })
                    .build()
            val registrations = InMemoryClientRegistrationRepository(registration)

            // Same converters and error handler as the default token RestClient, plus the timeouts
            val tokenResponseClient =
                RestClientClientCredentialsTokenResponseClient().apply {
                    setRestClient(
                        RestClient
                            .builder()
                            .requestFactory(requestFactory)
                            .configureMessageConverters {
                                it.addCustomConverter(FormHttpMessageConverter())
                                it.addCustomConverter(OAuth2AccessTokenResponseHttpMessageConverter())
                            }.defaultStatusHandler(OAuth2ErrorResponseErrorHandler())
                            .build(),
                    )
                }
            val authorizedClientProvider =
                ClientCredentialsOAuth2AuthorizedClientProvider().apply { setAccessTokenResponseClient(tokenResponseClient) }

            return AuthorizedClientServiceOAuth2AuthorizedClientManager(registrations, InMemoryOAuth2AuthorizedClientService(registrations))
                .apply { setAuthorizedClientProvider(authorizedClientProvider) }
        }
    }
}
