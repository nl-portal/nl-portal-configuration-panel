package nl.nlportal.configurationpanel.web.rest

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import nl.nlportal.configurationpanel.service.ConfigService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api", produces = ["application/json"])
class ConfigResource(
    private val configService: ConfigService
) {

    @GetMapping("/v1/configuration/{application}/{propertyKey}")
    fun getConfigurationPropertyByApplicationAndPropertyKeyOrNull(
        @PathVariable("application") application: String,
        @PathVariable("propertyKey") propertyKey: String
    ): ConfigurationProperty? {
        return configService.getConfigurationPropertyByApplicationAndPropertyKeyOrNull(application, propertyKey)
    }

    @PostMapping("/v1/configuration")
    fun addConfigurationProperty(@RequestBody config: ConfigurationProperty): ConfigurationProperty? {
        return configService.addConfigurationProperty(config)
    }
}
