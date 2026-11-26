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

package nl.nlportal.configurationpanel.domain

import ch.qos.logback.classic.Level
import ch.qos.logback.classic.Logger
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.slf4j.LoggerFactory

class ConfigurationPropertyTest {
    private val logger = LoggerFactory.getLogger(ConfigurationProperty::class.java) as Logger
    private val property = ConfigurationProperty(propertyKey = "nl-portal.config.x.token", propertyValue = "secret-value")

    @AfterEach
    fun resetLevel() {
        logger.level = null
    }

    @Test
    fun `toString hides the value below TRACE`() {
        logger.level = Level.DEBUG

        assertFalse(property.toString().contains("secret-value"))
        assertTrue(property.toString().contains("propertyKey=nl-portal.config.x.token"))
        assertTrue(property.toString().contains("propertyValue=[PROTECTED]"))
    }

    @Test
    fun `toString shows the value at TRACE`() {
        logger.level = Level.TRACE

        assertTrue(property.toString().contains("propertyValue=secret-value"))
    }
}
