package nl.nlportal.configurationpanel.domain

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.Type
import java.time.LocalDateTime

@Entity
@Table(name="nlp_config")
data class Config(
    @Id
    @Column(name="feature_id", updatable = false, nullable = false)
    val featureId: String = "",

    @Column(name="enabled")
    val enabled: Boolean = false,

    @Column(name="properties", columnDefinition = "jsonb")
    @Type(JsonType::class)
    val properties:Map<String, Any> = emptyMap(),

    @Column(name="modified_on")
    val modifiedOn: LocalDateTime = LocalDateTime.now(),
)
