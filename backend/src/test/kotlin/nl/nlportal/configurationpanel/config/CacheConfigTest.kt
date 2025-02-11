package nl.nlportal.configurationpanel.config

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigRepository
import nl.nlportal.configurationpanel.service.ConfigService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.time.Instant

@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [CacheConfig::class, ConfigService::class])
class CacheConfigTest {

    @Autowired
    lateinit var configService: ConfigService

    @MockitoBean
    lateinit var configRepository: ConfigRepository

    @Test
    fun `test caching behavior`() {
        val config = ConfigurationProperty(
            propertyKey = "feature1",
            propertyValue = "value1",
            application = "my-application1",
            modifiedOn = Instant.now()
        )

        `when`(
            configRepository.findByApplicationAndPropertyKey("my-application1", "feature1")
        )
            .thenReturn(config)

        // First call (should fetch from DB)
        val firstCall =
            configService
                .getConfigurationPropertyByApplicationAndPropertyKeyOrNull("my-application1", "feature1")

        // Second call (should return cached value)
        val secondCall =
            configService
                .getConfigurationPropertyByApplicationAndPropertyKeyOrNull("my-application1", "feature1")

        // Verify it's the same (cached)
        assertEquals(firstCall, secondCall)

        // Verify repository was only called once
        Mockito.verify(configRepository, Mockito.times(1))
            .findByApplicationAndPropertyKey("my-application1", "feature1")
    }
}
