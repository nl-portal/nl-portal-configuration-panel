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

package nl.nlportal.configurationpanel.notify.service

import io.github.oshai.kotlinlogging.KotlinLogging
import nl.nlportal.configurationpanel.notify.client.NlPortalClient
import nl.nlportal.configurationpanel.notify.configuration.ConfigurationPanelNotifyConfigurationProperties
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException

@Service
class NotifyService(
    private val notifyConfigurationProperties: ConfigurationPanelNotifyConfigurationProperties,
    private val nlPortalClient: NlPortalClient,
) {
    fun restartNlPortalClients() {
        logger.info {
            "Feature toggled. Sending restart signal to " +
                "${notifyConfigurationProperties.notifyList.size} client(s)."
        }
        notifyConfigurationProperties.notifyList.forEach {
            try {
                nlPortalClient.restartNlPortalClient(it)
            } catch (e: RestClientException) {
                logger.debug(e) { "Failed to restart NL Portal Client at url $it" }
            }
        }
    }

    fun refreshNlPortalClients() {
        logger.info {
            "Configuration properties changed. Sending refresh signal to " +
                "${notifyConfigurationProperties.notifyList.size} client(s)."
        }
        notifyConfigurationProperties.notifyList.forEach {
            try {
                nlPortalClient.refreshNlPortalClient(it)
            } catch (e: RestClientException) {
                logger.debug(e) { "Failed to refresh NL Portal Client at url $it" }
            }
        }
    }

    companion object {
        private val logger = KotlinLogging.logger {}
    }
}
