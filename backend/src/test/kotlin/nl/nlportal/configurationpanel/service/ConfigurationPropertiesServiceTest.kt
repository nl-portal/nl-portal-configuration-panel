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
import nl.nlportal.configurationpanel.event.ConfigurationPropertiesChangedEvent
import nl.nlportal.configurationpanel.event.FeatureToggledEvent
import nl.nlportal.configurationpanel.exception.PropertyKeyNotAllowedException
import nl.nlportal.configurationpanel.repository.ConfigurationsRepository
import nl.nlportal.configurationpanel.security.PropertyKeyAllowlist
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.never
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.any
import org.mockito.kotlin.anyOrNull
import org.mockito.kotlin.whenever
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
        configService =
            ConfigurationPropertiesService(
                configRepository,
                applicationEventPublisher,
                PropertyKeyAllowlist(arrayOf("nl-portal.config.", "nl-portal.frontend.")),
            )
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
        `when`(configRepository.findByApplicationAndPropertyKey("application", ALLOWED_KEY))
            .thenReturn(sampleConfig)

        // Act
        val result =
            configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull("application", ALLOWED_KEY)

        // Assert
        assertNotNull(result)
        assertEquals(sampleConfig, result)
        verify(configRepository, times(1))
            .findByApplicationAndPropertyKey("application", ALLOWED_KEY)
    }

    @Test
    fun `getConfigByFeatureId should return null when config is not found`() {
        // Arrange
        `when`(configRepository.findByApplicationAndPropertyKey("application", "nl-portal.config.non-existing"))
            .thenReturn(null)

        // Act
        val result =
            configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
                "application",
                "nl-portal.config.non-existing",
            )

        // Assert
        assertNull(result)
        verify(configRepository, times(1))
            .findByApplicationAndPropertyKey("application", "nl-portal.config.non-existing")
    }

    @Test
    fun `addConfig should save and return the config`() {
        // Arrange
        val config = sampleConfig.copy(propertyKey = ALLOWED_KEY)
        `when`(configRepository.save(config)).thenReturn(config)

        // Act
        val result = configService.saveConfigurationProperty(config)

        // Assert
        assertNotNull(result)
        assertEquals(config, result)
        verify(configRepository, times(1)).save(config)
        verify(applicationEventPublisher).publishEvent(ConfigurationPropertiesChangedEvent(listOf(config)))
    }

    @Test
    fun `saving allowed keys saves them and publishes the event`() {
        val configs = listOf(sampleConfig.copy(propertyKey = ALLOWED_KEY), sampleConfig.copy(propertyKey = "nl-portal.frontend.x"))
        `when`(configRepository.saveAll(configs)).thenReturn(configs)

        val result = configService.saveConfigurationProperties(configs)

        assertEquals(configs, result)
        verify(applicationEventPublisher).publishEvent(ConfigurationPropertiesChangedEvent(configs))
    }

    @Test
    fun `saving a disallowed key saves nothing`() {
        val configs = listOf(sampleConfig.copy(propertyKey = ALLOWED_KEY), sampleConfig.copy(propertyKey = DISALLOWED_KEY))

        val exception = assertThrows<PropertyKeyNotAllowedException> { configService.saveConfigurationProperties(configs) }

        assertEquals(listOf(DISALLOWED_KEY), exception.keys)
        verify(configRepository, never()).saveAll(any<List<ConfigurationProperty>>())
        verify(applicationEventPublisher, never()).publishEvent(any<Any>())
    }

    @Test
    fun `saving a single disallowed key saves nothing`() {
        assertThrows<PropertyKeyNotAllowedException> {
            configService.saveConfigurationProperty(sampleConfig.copy(propertyKey = DISALLOWED_KEY))
        }

        verify(configRepository, never()).save(any<ConfigurationProperty>())
        verify(applicationEventPublisher, never()).publishEvent(any<Any>())
    }

    @Test
    fun `toggling an allowed feature saves it and publishes the event`() {
        whenever(configRepository.findByApplicationAndPropertyKey("app", "nl-portal.config.zakenapi.enabled")).thenReturn(null)
        whenever(configRepository.save(any<ConfigurationProperty>())).thenAnswer { it.arguments[0] }

        val result = configService.setFeatureToggle("app", "nl-portal.config.zakenapi", true)

        assertEquals("nl-portal.config.zakenapi.enabled", result?.propertyKey)
        verify(applicationEventPublisher).publishEvent(any<FeatureToggledEvent>())
    }

    @Test
    fun `toggling a disallowed feature saves nothing`() {
        assertThrows<PropertyKeyNotAllowedException> { configService.setFeatureToggle("app", "nl-portal.security", true) }

        verify(configRepository, never()).findByApplicationAndPropertyKey(anyOrNull(), anyOrNull())
        verify(configRepository, never()).save(any<ConfigurationProperty>())
        verify(applicationEventPublisher, never()).publishEvent(any<Any>())
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
    fun `reads outside the allowed prefixes are refused`() {
        assertThrows<PropertyKeyNotAllowedException> { configService.getConfigurationPropertiesByApplicationAndFeatureKeyOrNull("app", "spring") }
        assertThrows<PropertyKeyNotAllowedException> { configService.getFeatureToggle("app", "nl-portal.security") }
        assertThrows<PropertyKeyNotAllowedException> { configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull("app", DISALLOWED_KEY) }

        verify(configRepository, never()).findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull(anyOrNull(), anyOrNull())
        verify(configRepository, never()).findByApplicationAndPropertyKey(anyOrNull(), anyOrNull())
    }

    @Test
    fun `reading all configuration leaves out keys outside the allowed prefixes`() {
        val allowed = sampleConfig.copy(propertyKey = ALLOWED_KEY)
        `when`(configRepository.findByApplicationAndRetiredInIsNull("app"))
            .thenReturn(listOf(allowed, sampleConfig.copy(propertyKey = DISALLOWED_KEY)))

        assertEquals(listOf(allowed), configService.getConfigurationPropertiesByApplicationOrNull("app"))
    }

    @Test
    fun `deleting a feature outside the allowed prefixes deletes nothing`() {
        assertThrows<PropertyKeyNotAllowedException> { configService.deleteConfigurationPropertiesByApplicationAndFeatureKey("app", "nl-portal.security") }

        verify(configRepository, never()).deleteAll(any<List<ConfigurationProperty>>())
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

    private companion object {
        private const val ALLOWED_KEY = "nl-portal.config.zakenapi.properties.url"
        private const val DISALLOWED_KEY = "nl-portal.security.x"
    }
}
