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

package nl.nlportal.configurationpanel.notify.configuration

import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.listener.NotifyEventListener
import nl.nlportal.configurationpanel.notify.service.NotifyService
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@EnableConfigurationProperties(ConfigurationPanelNotifyConfigurationProperties::class)
@ConditionalOnProperty(prefix = "configuration-panel.notify", name = ["notify-on-changes"], havingValue = "true")
class ConfigurationPanelNotifyConfiguration {
    @Bean
    fun nlPortalClient(properties: ConfigurationPanelNotifyConfigurationProperties): NlPortalClient {
        val client = properties.client
        val missing =
            mapOf(
                "CONFIG_NOTIFY_CLIENT_TOKEN_URI" to client.tokenUri,
                "CONFIG_NOTIFY_CLIENT_ID" to client.clientId,
                "CONFIG_NOTIFY_CLIENT_SECRET" to client.clientSecret,
            ).filterValues { it.isNullOrBlank() }.keys
        require(missing.isEmpty()) { "$missing required when CONFIG_NOTIFY_ENABLED=true" }
        return NlPortalClient(properties)
    }

    @Bean
    fun notifyService(
        properties: ConfigurationPanelNotifyConfigurationProperties,
        nlPortalClient: NlPortalClient,
    ): NotifyService = NotifyService(properties, nlPortalClient)

    @Bean
    fun configurationPropertiesChangedEventListener(notifyService: NotifyService): NotifyEventListener = NotifyEventListener(notifyService)
}
