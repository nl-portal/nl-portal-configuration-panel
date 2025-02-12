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

import com.google.common.cache.CacheBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.Cache
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.CachingConfigurer
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cache.concurrent.ConcurrentMapCache
import org.springframework.cache.concurrent.ConcurrentMapCacheManager
import org.springframework.context.annotation.Configuration
import java.util.concurrent.TimeUnit

@EnableCaching
@Configuration
class ConfigurationPanelCacheConfiguration(
    @Value("\${configuration-panel.cache.config-ttl}") private val configTtl: Long = 500
) : CachingConfigurer {

    @Override
    override fun cacheManager(): CacheManager {
        val cacheManager: ConcurrentMapCacheManager = object : ConcurrentMapCacheManager() {
            override fun createConcurrentMapCache(name: String): Cache {
                return ConcurrentMapCache(
                    name,
                    CacheBuilder.newBuilder()
                        .expireAfterAccess(configTtl, TimeUnit.MILLISECONDS)
                        .build<Any, Any>()
                        .asMap(),
                    true
                )
            }
        }

        return cacheManager
    }
}
