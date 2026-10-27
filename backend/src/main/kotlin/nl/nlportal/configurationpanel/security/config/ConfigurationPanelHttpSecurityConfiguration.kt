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

package nl.nlportal.configurationpanel.security.config

import io.github.oshai.kotlinlogging.KotlinLogging
import nl.nlportal.configurationpanel.security.TokenAuthenticationProvider
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.EnableConfigurationProperties
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
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(ConfigurationPanelCorsConfigurationProperties::class)
class ConfigurationPanelHttpSecurityConfiguration {
    @Value("\${spring.cloud.config.server.prefix}")
    private val configServerBasePath: String = ""

    @Bean
    fun tokenAuthenticationProvider(
        @Value("\${configuration-panel.security.token}") configurationToken: String = "",
    ): AuthenticationProvider = TokenAuthenticationProvider(configurationToken)

    @Bean
    fun configurationPanelAuthenticationManager(authenticationProviders: List<AuthenticationProvider>): AuthenticationManager = ProviderManager(authenticationProviders)

    @Bean
    fun corsConfigurationSource(
        configurationPanelCorsConfigurationProperties: ConfigurationPanelCorsConfigurationProperties,
    ): UrlBasedCorsConfigurationSource {
        val source = UrlBasedCorsConfigurationSource()

        configurationPanelCorsConfigurationProperties.cors.forEach {
            source.registerCorsConfiguration(it.path, it.config)
        }

        return source
    }

    @Bean
    fun configurationPanelSecurityFilterChain(
        @Value("\${configuration-panel.security.authorities}") authorities: Array<String>,
        http: HttpSecurity,
    ): SecurityFilterChain {
        if (authorities.isEmpty()) {
            logger.warn { "configuration-panel.security.authorities is empty: nobody can use the REST API" }
        }

        http
            .securityMatcher("/api/v1/**")
            .authorizeHttpRequests { request ->
                if (authorities.isEmpty()) {
                    request.anyRequest().denyAll()
                } else {
                    request.anyRequest().hasAnyAuthority(*authorities)
                }
            }.csrf { it.disable() }
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
            .securityMatcher("$configServerBasePath/**")
            .authorizeHttpRequests { request ->
                request.anyRequest().authenticated()
            }.csrf { it.disable() }
            .cors { it.disable() }
            .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .addFilter(configurationServerRequestHeaderAuthenticationFilter(authenticationManager))

        return http.build()
    }

    fun configurationServerRequestHeaderAuthenticationFilter(
        authenticationManager: AuthenticationManager,
    ): RequestHeaderAuthenticationFilter = RequestHeaderAuthenticationFilter().apply {
        setPrincipalRequestHeader("X-Config-Token")
        setExceptionIfHeaderMissing(false)
        setRequiresAuthenticationRequestMatcher(
            PathPatternRequestMatcher.withDefaults().matcher("$configServerBasePath/**"),
        )
        setAuthenticationManager(authenticationManager)
    }

    private companion object {
        private val logger = KotlinLogging.logger { }
    }
}
