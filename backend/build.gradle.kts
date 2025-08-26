import org.springframework.boot.gradle.tasks.bundling.BootJar

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

val ehcacheVersion by project.properties
val hypersistenceVersion by project.properties
val postgresVersion by project.properties
val springCloudServerVersion by project.properties
val springCloudBootstrapVersion by project.properties
val springSecurityOauth2Version by project.properties
val kotlinLoggingVersion by project.properties
val apacheTikaVersion by project.properties
val mockitoAgent = configurations.create("mockitoAgent")

plugins {
    kotlin("jvm") version "1.9.25"
    kotlin("plugin.spring") version "1.9.25"
    id("org.springframework.boot") version "3.4.6"
    id("io.spring.dependency-management") version "1.1.7"
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-cache")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.security:spring-security-oauth2-jose:$springSecurityOauth2Version")
    implementation("org.springframework.security:spring-security-oauth2-resource-server:$springSecurityOauth2Version")
    implementation("org.springframework.cloud:spring-cloud-config-server:$springCloudServerVersion")
    implementation("org.springframework.cloud:spring-cloud-starter-bootstrap:$springCloudBootstrapVersion")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.liquibase:liquibase-core")
    implementation("org.ehcache:ehcache:$ehcacheVersion")
    implementation("io.hypersistence:hypersistence-utils-hibernate-62:$hypersistenceVersion")
    implementation("org.postgresql:postgresql:$postgresVersion")
    implementation("com.github.ben-manes.caffeine:caffeine")
    implementation("org.apache.tika:tika-core:$apacheTikaVersion")

    implementation("io.github.oshai:kotlin-logging-jvm:$kotlinLoggingVersion")

    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito:mockito-core:5.16.1")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.4.0")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    mockitoAgent("org.mockito:mockito-core:5.16.1") { isTransitive = false }
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

// localhost env vars
tasks.bootRun {
    environment.putAll(
        mapOf(
            "SERVER_PORT" to "8090",
            "DATABASE_URL" to "jdbc:postgresql://localhost:54322/nl-portal-config",
            "DATABASE_USERNAME" to "config",
            "DATABASE_PASSWORD" to "password",
            "LOGLEVEL" to "INFO",
            "JWKS_URI" to "http://localhost:8082/auth/realms/nlportalconfig/protocol/openid-connect/certs",
            "CONFIG_CACHE_TTL" to "30000",
            "CONFIG_SERVER_PREFIX" to "/configuration",
            "CONFIG_SERVER_TOKEN" to "VerySecretToken",
            "CONFIG_NOTIFY_ENABLED" to "true",
            "CONFIG_NOTIFY_LIST" to "http://localhost:8080/",
        ),
    )
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("-javaagent:${mockitoAgent.asPath}")
}

tasks.named<BootJar>("bootJar") {
    archiveFileName = "${project.name}.jar"
}
