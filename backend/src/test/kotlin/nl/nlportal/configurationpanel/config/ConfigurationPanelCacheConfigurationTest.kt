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

package nl.nlportal.configurationpanel.config

import nl.nlportal.configurationpanel.configuration.ConfigurationPanelCacheConfiguration
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
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.time.Instant

@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [
    ConfigurationPanelCacheConfiguration::class,
    ConfigService::class,
    TestCacheConfiguration::class
])
class ConfigurationPanelCacheConfigurationTest {

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

        assertEquals(firstCall, secondCall)

        // Verify repository was only called once
        Mockito.verify(configRepository, Mockito.times(1))
            .findByApplicationAndPropertyKey("my-application1", "feature1")
    }
}

@TestConfiguration
class TestCacheConfiguration {
    @Bean
    fun cacheManager(): CacheManager {
        return ConcurrentMapCacheManager("configCache")
    }
}
