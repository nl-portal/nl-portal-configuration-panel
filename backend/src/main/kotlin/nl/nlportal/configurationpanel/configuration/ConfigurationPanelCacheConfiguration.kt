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

package nl.nlportal.configurationpanel.configuration

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.autoconfigure.cache.CacheManagerCustomizer
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.Scheduled

@EnableCaching
@Configuration
class ConfigurationPanelCacheConfiguration: CacheManagerCustomizer<ConcurrentMapCacheManager> {

    override fun customize(cacheManager: ConcurrentMapCacheManager) {
        cacheManager.setCacheNames(listOf("configCache"))
    }

    @CacheEvict(cacheNames = ["configCache"], allEntries = true)
    @Scheduled(fixedRateString = "\${configuration-panel.cache.config-ttl}")
    fun emptyConfigCache() {
        logger.debug { "Emptying configCache" }
    }

    companion object {
        val logger = KotlinLogging.logger { }
    }
}
