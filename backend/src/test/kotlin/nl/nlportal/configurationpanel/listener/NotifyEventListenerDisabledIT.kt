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

package nl.nlportal.configurationpanel.listener

import nl.nlportal.configurationpanel.event.ConfigurationPropertiesChangedEvent
import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.service.NotifyService
import org.junit.jupiter.api.Tag
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.kotlin.any
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.webtestclient.autoconfigure.AutoConfigureWebTestClient
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.ApplicationEventPublisher
import org.springframework.context.annotation.Bean
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
@Tag("integration")
@AutoConfigureWebTestClient(timeout = "36000")
@ActiveProfiles(profiles = ["no-notify", "jdbc"])
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NotifyEventListenerDisabledIT(
    @Autowired private val applicationEventPublisher: ApplicationEventPublisher,
) {
    @TestConfiguration
    class TestCacheConfiguration {
        @Bean
        fun cacheManager(): CacheManager = ConcurrentMapCacheManager("configCache")
    }

    @MockitoSpyBean
    lateinit var notifyService: NotifyService

    @MockitoSpyBean
    lateinit var nlPortalClient: NlPortalClient

    @Test
    fun `should not notify on configuration properties change`() {
        // Given
        val event = ConfigurationPropertiesChangedEvent(emptyList())

        // When
        applicationEventPublisher.publishEvent(event)

        // Then
        verify(notifyService, times(0)).restartNlPortalClients()
        verify(nlPortalClient, times(0)).restartNlPortalClient(any())
    }
}
