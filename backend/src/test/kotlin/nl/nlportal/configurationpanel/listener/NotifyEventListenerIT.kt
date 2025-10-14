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
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.cache.CacheManager
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.ApplicationEventPublisher
import org.springframework.context.annotation.Bean
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean
import org.springframework.test.context.transaction.TestTransaction
import org.springframework.transaction.annotation.Transactional

@Transactional
@SpringBootTest
@Tag("integration")
@AutoConfigureWebTestClient(timeout = "36000")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NotifyEventListenerIT(
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
    fun `should notify client to restart on configuration change`() {
        // Given
        val event = ConfigurationPropertiesChangedEvent(emptyList())

        // When
        applicationEventPublisher.publishEvent(event)
        TestTransaction.end()

        // Then
        verify(notifyService, times(1)).restartNlPortalClients()
        verify(nlPortalClient, times(2)).restartNlPortalClient(any())
    }
}
