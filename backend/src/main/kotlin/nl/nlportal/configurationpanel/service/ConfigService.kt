package nl.nlportal.configurationpanel.service

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.repository.ConfigRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class ConfigService(
    private val configRepository: ConfigRepository,
) {

    @Cacheable("configCache")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        application: String,
        propertyKey: String
    ): ConfigurationProperty? {
        return configRepository.findByApplicationAndPropertyKey(application, propertyKey)
    }

    fun addConfigurationProperty(config: ConfigurationProperty): ConfigurationProperty? {
        return configRepository.save(config)
    }
}
