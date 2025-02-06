package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.domain.Config
import nl.nlportal.configurationpanel.repository.ConfigRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class ConfigService(
    private val configRepository: ConfigRepository,
) {

    @Cacheable("configCache")
    fun getConfigByFeatureId(featureId: String): Config? {
        return configRepository.findByFeatureId(featureId)
    }

    fun addConfig(config: Config): Config? {
        return configRepository.save(config)
    }
}
