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

package nl.nlportal.configurationpanel.repository

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ConfigurationsRepository : JpaRepository<ConfigurationProperty, String> {
    fun findByApplicationAndRetiredInIsNull(application: String): List<ConfigurationProperty>?

    fun findByApplicationAndPropertyKey(
        application: String,
        propertyKey: String,
    ): ConfigurationProperty?

    fun findByApplicationAndPropertyKeyStartsWithAndRetiredInIsNull(
        application: String,
        propertyKeyPrefix: String,
    ): List<ConfigurationProperty>?

    fun findByApplicationAndRetiredInIsNotNullOrderByRetiredInAscPropertyKeyAsc(application: String): List<ConfigurationProperty>

    fun findByApplicationAndPropertyKeyAndRetiredInIsNotNull(
        application: String,
        propertyKey: String,
    ): ConfigurationProperty?

    // Spring Data would read the `In` of `retiredIn` as an operator, so this one is spelled out.
    @Query("SELECT c FROM ConfigurationProperty c WHERE c.application = :application AND c.retiredIn = :retiredIn")
    fun findRetiredByApplicationAndVersion(
        application: String,
        retiredIn: String,
    ): List<ConfigurationProperty>
}
