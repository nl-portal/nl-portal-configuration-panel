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

package nl.nlportal.configurationpanel.security

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

/**
 * Property keys the panel may write and the config server may serve.
 */
@Component
class PropertyKeyAllowlist(
    @Value("\${configuration-panel.security.allowed-key-prefixes}") allowedKeyPrefixes: Array<String>,
) {
    private val prefixes = allowedKeyPrefixes.map { it.trim() }.filter { it.isNotBlank() }

    init {
        if (prefixes.isEmpty()) {
            logger.warn { "configuration-panel.security.allowed-key-prefixes is empty: any property key can be read, written, deleted and served" }
        }
    }

    fun isAllowed(key: String) = prefixes.isEmpty() || prefixes.any { key.startsWith(it) }

    fun disallowed(keys: Collection<String>) = keys.filterNot { isAllowed(it) }

    private companion object {
        private val logger = KotlinLogging.logger { }
    }
}
