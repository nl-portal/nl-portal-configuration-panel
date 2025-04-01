package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import java.time.Instant

@ExtendWith(MockitoExtension::class)
class ConfigServiceTest {

    @Mock
    private lateinit var configRepository: ConfigRepository

    @Mock
    private lateinit var notifyService: NotifyService

    private lateinit var configService: ConfigService

    private lateinit var sampleConfig: ConfigurationProperty

    @BeforeEach
    fun setUp() {
        configService = ConfigService(configRepository, notifyService)
        sampleConfig = ConfigurationProperty(
            propertyKey = "feature_123",
            propertyValue = "value1",
            application = "my-application1",
            modifiedOn = Instant.now()
        )
    }

    @Test
    fun `getConfigByFeatureId should return config when found`() {
        // Arrange
        `when`(configRepository.findByApplicationAndPropertyKey("application", "feature_123"))
            .thenReturn(sampleConfig)

        // Act
        val result =
            configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull("application", "feature_123")

        // Assert
        assertNotNull(result)
        assertEquals(sampleConfig, result)
        verify(configRepository, times(1))
            .findByApplicationAndPropertyKey("application", "feature_123")
    }

    @Test
    fun `getConfigByFeatureId should return null when config is not found`() {
        // Arrange
        `when`(configRepository.findByApplicationAndPropertyKey("application", "non_existing_feature"))
            .thenReturn(null)

        // Act
        val result =
            configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
                "application",
                "non_existing_feature"
            )

        // Assert
        assertNull(result)
        verify(configRepository, times(1))
            .findByApplicationAndPropertyKey("application", "non_existing_feature")
    }

    @Test
    fun `addConfig should save and return the config`() {
        // Arrange
        `when`(configRepository.save(sampleConfig)).thenReturn(sampleConfig)

        // Act
        val result = configService.saveConfigurationProperty(sampleConfig)

        // Assert
        assertNotNull(result)
        assertEquals(sampleConfig, result)
        verify(configRepository, times(1)).save(sampleConfig)
    }
}
