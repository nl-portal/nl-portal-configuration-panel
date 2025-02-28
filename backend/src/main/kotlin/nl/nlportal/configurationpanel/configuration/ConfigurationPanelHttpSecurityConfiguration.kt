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

package nl.nlportal.configurationpanel.configuration

import io.github.oshai.kotlinlogging.KotlinLogging
import nl.nlportal.configurationpanel.security.TokenAuthenticationProvider
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

@Configuration
@EnableWebSecurity
class ConfigurationPanelHttpSecurityConfiguration {
    @Value("\${spring.cloud.config.server.prefix}")
    private val configServerBasePath: String = ""

    @Bean
    fun tokenAuthenticationProvider(
        @Value("\${configuration-panel.security.token}") configurationToken: String = ""
    ): AuthenticationProvider {
        return TokenAuthenticationProvider(configurationToken)
    }

    @Bean
    fun configurationPanelAuthenticationManager(
        authenticationProviders: List<AuthenticationProvider>,
    ): AuthenticationManager =
        ProviderManager(authenticationProviders)

    @Bean
    fun configurationPanelSecurityFilterChain(
        authenticationManager: AuthenticationManager,
        http: HttpSecurity,
    ): SecurityFilterChain {
        http
            .securityMatcher(AntPathRequestMatcher("/api/v1/**"))
            .authorizeHttpRequests { request ->
                request.anyRequest().authenticated()
            }
            .csrf { it.disable() }
            .cors { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .oauth2ResourceServer {
                it.jwt {}
            }

        return http.build()
    }

    @Bean
    fun configurationServerSecurityFilterChain(
        authenticationManager: AuthenticationManager,
        http: HttpSecurity,
    ): SecurityFilterChain {
        http
            .securityMatcher(AntPathRequestMatcher("$configServerBasePath/**"))
            .authorizeHttpRequests { request ->
                request.anyRequest().authenticated()
            }
            .csrf { it.disable() }
            .cors { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .addFilter(configurationServerRequestHeaderAuthenticationFilter(authenticationManager))

        return http.build()
    }

    fun configurationServerRequestHeaderAuthenticationFilter(
        authenticationManager: AuthenticationManager
    ): RequestHeaderAuthenticationFilter {
        return RequestHeaderAuthenticationFilter().apply {
            setPrincipalRequestHeader("X-Config-Token")
            setExceptionIfHeaderMissing(false)
            setRequiresAuthenticationRequestMatcher(
                AntPathRequestMatcher("$configServerBasePath/**")
            )
            setAuthenticationManager(authenticationManager)
        }
    }
}

