package nl.nlportal.configurationpanel.security.config

import nl.nlportal.configurationpanel.service.ConfigurationPropertiesService
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest
@Tag("integration")
@AutoConfigureMockMvc
@ActiveProfiles(profiles = ["no-notify", "jdbc"])
class ApiAuthoritiesDisabledIT(
    @Autowired private val mockMvc: MockMvc,
) {
    @TestConfiguration
    class TestConfig {
        @Bean
        fun cacheManager(): CacheManager = ConcurrentMapCacheManager("configCache")

        @Bean
        fun jwtDecoder(): JwtDecoder =
            JwtDecoder { token ->
                Jwt
                    .withTokenValue(token)
                    .header("alg", "none")
                    .subject("tester")
                    .claim("realm_access", mapOf("roles" to emptyList<String>()))
                    .build()
            }
    }

    @MockitoBean
    lateinit var configurationPropertiesService: ConfigurationPropertiesService

    @Test
    fun `allows any authenticated token`() {
        mockMvc
            .get(FEATURE_ENABLED_URI) { header("Authorization", "Bearer no-role") }
            .andExpect { status { isOk() } }
    }

    @Test
    fun `rejects a request without a token`() {
        mockMvc
            .get(FEATURE_ENABLED_URI)
            .andExpect { status { isUnauthorized() } }
    }

    companion object {
        private const val FEATURE_ENABLED_URI = "/api/v1/configurations/nl-portal-app/features/test/enabled"
    }
}
