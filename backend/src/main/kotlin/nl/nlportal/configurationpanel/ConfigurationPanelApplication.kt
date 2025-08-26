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

package nl.nlportal.configurationpanel

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.cloud.config.server.EnableConfigServer
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.scheduling.annotation.EnableScheduling
import java.net.InetAddress

@SpringBootApplication
@EnableCaching
@EnableScheduling
@EnableConfigServer
@EnableJpaRepositories(basePackages = ["nl.nlportal.configurationpanel"])
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
