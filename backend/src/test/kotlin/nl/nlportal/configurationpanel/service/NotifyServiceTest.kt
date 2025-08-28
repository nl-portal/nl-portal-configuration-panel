package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfigurationProperties
import nl.nlportal.configurationpanel.notify.service.NotifyService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.Mockito.mock
import org.mockito.Mockito.times
import org.mockito.Mockito.verify
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.any

@ExtendWith(MockitoExtension::class)
class NotifyServiceTest {
    @Mock
    private lateinit var notifyConfigurationProperties: ConfigurationPanelNotifyConfigurationProperties

    @Mock
    private lateinit var nlPortalClient: NlPortalClient

    private lateinit var notifyService: NotifyService

    @BeforeEach
    fun setUp() {
        notifyConfigurationProperties =
            ConfigurationPanelNotifyConfigurationProperties(
                notifyOnChanges = true,
                notifyList =
                    listOf(
                        "https://localhost:9001",
                        "https://localhost:9002",
                    ),
            )
        nlPortalClient = mock()

        notifyService = NotifyService(notifyConfigurationProperties, nlPortalClient)
    }

    @Test
    fun `should notify all clients in notifyList`() {
        // When
        notifyService.restartNlPortalClients()

        // Then
        verify(nlPortalClient, times(2)).restartNlPortalViaActuator(any())
    }
}
