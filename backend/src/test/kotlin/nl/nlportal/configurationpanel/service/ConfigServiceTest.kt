package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.domain.Config
import nl.nlportal.configurationpanel.repository.ConfigRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.junit.jupiter.MockitoExtension
import java.time.LocalDateTime

@ExtendWith(MockitoExtension::class)
class ConfigServiceTest {

    @Mock
    private lateinit var configRepository: ConfigRepository

    @InjectMocks
    private lateinit var configService: ConfigService

    private lateinit var sampleConfig: Config

    @BeforeEach
    fun setUp() {
        sampleConfig = Config(
            featureId="feature_123",
            enabled = true,
            properties = emptyMap(),
            modifiedOn = LocalDateTime.now()
        )
    }

    @Test
    fun `getConfigByFeatureId should return config when found`() {
        // Arrange
        `when`(configRepository.findByFeatureId("feature_123")).thenReturn(sampleConfig)

        // Act
        val result = configService.getConfigByFeatureId("feature_123")

        // Assert
        assertNotNull(result)
        assertEquals(sampleConfig, result)
        verify(configRepository, times(1)).findByFeatureId("feature_123")
    }

    @Test
    fun `getConfigByFeatureId should return null when config is not found`() {
        // Arrange
        `when`(configRepository.findByFeatureId("non_existing_feature")).thenReturn(null)

        // Act
        val result = configService.getConfigByFeatureId("non_existing_feature")

        // Assert
        assertNull(result)
        verify(configRepository, times(1)).findByFeatureId("non_existing_feature")
    }

    @Test
    fun `addConfig should save and return the config`() {
        // Arrange
        `when`(configRepository.save(sampleConfig)).thenReturn(sampleConfig)

        // Act
        val result = configService.addConfig(sampleConfig)

        // Assert
        assertNotNull(result)
        assertEquals(sampleConfig, result)
        verify(configRepository, times(1)).save(sampleConfig)
    }
}
