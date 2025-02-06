package nl.nlportal.configurationpanel.web.rest

import nl.nlportal.configurationpanel.domain.Config
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

    @GetMapping("/v1/config/{featureId}")
    fun getConfigForFeatureId(@PathVariable("featureId") featureId: String) : Config? {
        return configService.getConfigByFeatureId(featureId )
    }

    @PostMapping("/v1/config")
    fun addConfig(@RequestBody config: Config): Config? {
        return configService.addConfig(config)
    }
}
