package nl.nlportal.configurationpanel

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cloud.config.server.EnableConfigServer
import org.springframework.scheduling.annotation.EnableScheduling
import java.net.InetAddress

@SpringBootApplication
@EnableCaching
@EnableScheduling
@EnableConfigServer
class ConfigurationPanelApplication

fun main(args: Array<String>) {
    runApplication<ConfigurationPanelApplication>(*args).apply {
        KotlinLogging.logger { }.info {
            """
            Application '${environment.getProperty("spring.application.name")}' is running!
            Local URL: [http://127.0.0.1:${environment.getProperty("server.port")}].
            External URL: [http://${InetAddress.getLocalHost().hostAddress}:${environment.getProperty("server.port")}]
            """.trimIndent()
        }
    }
}
