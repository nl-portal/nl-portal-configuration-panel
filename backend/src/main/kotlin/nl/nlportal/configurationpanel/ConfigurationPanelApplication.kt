package nl.nlportal.configurationpanel

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
@EnableCaching
class ConfigurationPanelApplication

fun main(args: Array<String>) {
	runApplication<ConfigurationPanelApplication>(*args)
}
