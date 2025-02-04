package nl.nlportal.configuration_panel

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ConfigurationPanelApplication

fun main(args: Array<String>) {
	runApplication<ConfigurationPanelApplication>(*args)
}
