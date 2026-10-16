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

package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigurationsRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.never
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.any
import org.springframework.context.ApplicationEventPublisher
import java.time.Instant

@ExtendWith(MockitoExtension::class)
class ConfigurationPropertiesServiceTest {
    @Mock
    private lateinit var configRepository: ConfigurationsRepository

    @Mock
    private lateinit var applicationEventPublisher: ApplicationEventPublisher

    private lateinit var configService: ConfigurationPropertiesService

    private lateinit var sampleConfig: ConfigurationProperty

    @BeforeEach
    fun setUp() {
        configService = ConfigurationPropertiesService(configRepository, applicationEventPublisher)
        sampleConfig =
            ConfigurationProperty(
                propertyKey = "feature_123",
                propertyValue = "value1",
                application = "my-application1",
                modifiedOn = Instant.now(),
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
                "non_existing_feature",
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

    @Test
    fun `feature reads exclude retired rows`() {
        `when`(configRepository.findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull("app", "nl-portal.config.zakenapi"))
            .thenReturn(listOf(sampleConfig))

        val result = configService.getConfigurationPropertiesByApplicationAndFeatureKeyOrNull("app", "nl-portal.config.zakenapi")

        assertEquals(listOf(sampleConfig), result)
    }

    @Test
    fun `prefix deletes leave retired rows alone`() {
        `when`(configRepository.findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull("app", "nl-portal.config.zakenapi"))
            .thenReturn(listOf(sampleConfig))

        configService.deleteConfigurationPropertiesByApplicationAndFeatureKey("app", "nl-portal.config.zakenapi")

        verify(configRepository).deleteAll(listOf(sampleConfig))
        verify(configRepository, never()).findRetiredByApplicationAndVersion(any(), any())
    }

    @Test
    fun `single retired delete refuses live keys`() {
        `when`(configRepository.findByApplicationAndPropertyKeyAndRetiredInIsNotNull("app", "feature_123"))
            .thenReturn(null)

        val deleted = configService.deleteRetiredConfigurationProperty("app", "feature_123")

        assertFalse(deleted)
        verify(configRepository, never()).delete(any())
    }

    @Test
    fun `single retired delete removes a retired key`() {
        val retired = sampleConfig.copy(retiredIn = "4.0")
        `when`(configRepository.findByApplicationAndPropertyKeyAndRetiredInIsNotNull("app", "feature_123"))
            .thenReturn(retired)

        val deleted = configService.deleteRetiredConfigurationProperty("app", "feature_123")

        assertTrue(deleted)
        verify(configRepository).delete(retired)
        verify(applicationEventPublisher, never()).publishEvent(any<Any>())
    }

    @Test
    fun `bulk retired delete only touches the given version`() {
        val retired = listOf(sampleConfig.copy(retiredIn = "4.0"))
        `when`(configRepository.findRetiredByApplicationAndVersion("app", "4.0")).thenReturn(retired)

        configService.deleteRetiredConfigurationProperties("app", "4.0")

        verify(configRepository).findRetiredByApplicationAndVersion("app", "4.0")
        verify(configRepository).deleteAll(retired)
    }
}
