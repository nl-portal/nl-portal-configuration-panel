package nl.nlportal.configurationpanel.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant

@Entity
@Table(name = "nlp_configuration")
data class ConfigurationProperty(
    @Id
    @Column(name = "property_key", updatable = false, nullable = false)
    val propertyKey: String = "",

    @Column(name = "property_value", updatable = true, nullable = false)
    val propertyValue: String = "",

    @Column(name = "application", updatable = false, nullable = false)
    val application: String = "",

    @Column(name = "profile", nullable = true)
    val profile: String? = null,

    @Column(name = "label", nullable = true)
    val label: String? = null,

    @Column(name = "modified_on")
    val modifiedOn: Instant = Instant.now(),
)
