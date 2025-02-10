package nl.nlportal.configurationpanel.config

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
class CacheConfig(
    @Value("\${configuration-panel.cache.config-ttl:500}") private val configTtl: Long
) : CachingConfigurer {

    @Override
    override fun cacheManager(): CacheManager {
        val cacheManager: ConcurrentMapCacheManager = object : ConcurrentMapCacheManager() {
            override fun createConcurrentMapCache(name: String): Cache {
                return ConcurrentMapCache(
                    name,
                    CacheBuilder.newBuilder()
                        .expireAfterAccess(configTtl, TimeUnit.SECONDS)
                        .build<Any, Any>()
                        .asMap(),
                    false
                )
            }
        }

        return cacheManager
    }
}
