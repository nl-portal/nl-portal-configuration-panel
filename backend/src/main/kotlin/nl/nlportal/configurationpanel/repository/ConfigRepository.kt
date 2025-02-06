package nl.nlportal.configurationpanel.repository

import nl.nlportal.configurationpanel.domain.Config
import org.springframework.data.jpa.repository.JpaRepository

interface ConfigRepository: JpaRepository<Config, String> {

     fun findByFeatureId(featureId: String): Config?
}
