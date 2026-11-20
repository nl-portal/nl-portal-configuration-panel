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

package nl.nlportal.configurationpanel.notify

import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfiguration
import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfigurationProperties
import nl.nlportal.configurationpanel.notify.listener.NotifyEventListener
import nl.nlportal.configurationpanel.notify.service.NotifyService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.runner.ApplicationContextRunner
import java.time.Duration

class ConfigurationPanelNotifyConfigurationTest {
    private val contextRunner =
        ApplicationContextRunner().withUserConfiguration(ConfigurationPanelNotifyConfiguration::class.java)

    @Test
    fun `notify on with every client setting creates the notify beans`() {
        contextRunner
            .withPropertyValues(*NOTIFY_ON, *CLIENT)
            .run { context ->
                assertEquals(1, context.getBeansOfType(NlPortalClient::class.java).size)
                assertEquals(1, context.getBeansOfType(NotifyService::class.java).size)
                assertEquals(1, context.getBeansOfType(NotifyEventListener::class.java).size)
            }
    }

    @Test
    fun `notify on with a blank client id fails startup`() {
        contextRunner
            .withPropertyValues(*NOTIFY_ON, *CLIENT, "configuration-panel.notify.client.client-id=")
            .run { context ->
                assertTrue(context.startupFailure!!.stackTraceToString().contains("[CONFIG_NOTIFY_CLIENT_ID] required when CONFIG_NOTIFY_ENABLED=true"))
            }
    }

    @Test
    fun `timeouts bind`() {
        contextRunner
            .withPropertyValues(*NOTIFY_ON, *CLIENT, "configuration-panel.notify.connect-timeout=2s", "configuration-panel.notify.read-timeout=3s")
            .run { context ->
                val properties = context.getBean(ConfigurationPanelNotifyConfigurationProperties::class.java)
                assertEquals(Duration.ofSeconds(2), properties.connectTimeout)
                assertEquals(Duration.ofSeconds(3), properties.readTimeout)
            }
    }

    @Test
    fun `timeouts default to 5 and 10 seconds`() {
        contextRunner
            .withPropertyValues(*NOTIFY_ON, *CLIENT)
            .run { context ->
                val properties = context.getBean(ConfigurationPanelNotifyConfigurationProperties::class.java)
                assertEquals(Duration.ofSeconds(5), properties.connectTimeout)
                assertEquals(Duration.ofSeconds(10), properties.readTimeout)
            }
    }

    @Test
    fun `notify off needs no client settings and creates no notify beans`() {
        contextRunner
            .withPropertyValues("configuration-panel.notify.notify-on-changes=false")
            .run { context ->
                assertEquals(null, context.startupFailure)
                assertTrue(context.getBeansOfType(NlPortalClient::class.java).isEmpty())
                assertTrue(context.getBeansOfType(NotifyService::class.java).isEmpty())
                assertTrue(context.getBeansOfType(NotifyEventListener::class.java).isEmpty())
            }
    }

    private companion object {
        private val NOTIFY_ON = arrayOf("configuration-panel.notify.notify-on-changes=true")
        private val CLIENT =
            arrayOf(
                "configuration-panel.notify.client.token-uri=http://localhost:1/token",
                "configuration-panel.notify.client.client-id=panel",
                "configuration-panel.notify.client.client-secret=secret",
            )
    }
}
