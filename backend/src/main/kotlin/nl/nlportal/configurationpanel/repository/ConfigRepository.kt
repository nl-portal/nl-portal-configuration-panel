package nl.nlportal.configurationpanel.repository

import nl.nlportal.configurationpanel.domain.ConfigurationProperty
import org.springframework.data.jpa.repository.JpaRepository

interface ConfigRepository : JpaRepository<ConfigurationProperty, String> {

    fun findByApplication(featureId: String): List<ConfigurationProperty>?

    fun findByApplicationAndPropertyKey(application: String, propertyKey: String): ConfigurationProperty?

    fun findByApplicationAndPropertyKeyStartsWith(
        application: String,
        propertyKeyPrefix: String
    ): List<ConfigurationProperty>?
}
