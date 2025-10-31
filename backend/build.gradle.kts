import org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21
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
    kotlin("jvm")
    kotlin("plugin.spring")
    id("org.springframework.boot")
    id("io.spring.dependency-management")

    id("org.jlleitschuh.gradle.ktlint")
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
    implementation("org.springframework.boot:spring-boot-starter-actuator")
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

    // CVE-2025-48924
    implementation("org.apache.commons:commons-lang3:3.18.0")

    // CVE-2020-36843
    // Does not affect this application. No fix available.

    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito:mockito-core:5.16.1")
    testImplementation("org.mockito.kotlin:mockito-kotlin:5.4.0")
    testImplementation("com.h2database:h2:2.3.232")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    mockitoAgent("org.mockito:mockito-core:5.16.1") { isTransitive = false }
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

kotlin {
    compilerOptions {
        jvmTarget = JVM_21
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

tasks.bootRun {
    // overrides for running from sources
    val developmentEnv =
        mapOf(
            "SERVER_PORT" to "8090",
            "DATABASE_URL" to "jdbc:postgresql://localhost:54322/nl-portal-config",
            "JWKS_URI" to "http://localhost:8082/auth/realms/nlportalconfig/protocol/openid-connect/certs",
            "CONFIG_NOTIFY_LIST" to "http://localhost:8080/",
        )

    environment.putAll(
        project
            .file("../imports/backend.env")
            .takeIf { it.exists() && it.isFile }
            ?.readLines()
            ?.filterNot { it.startsWith("#") || it.startsWith("//") || it.isEmpty() }
            ?.associate { line ->
                val entry = line.split("=", limit = 2)
                entry.first() to entry.last()
            }?.plus(developmentEnv)
            ?: developmentEnv,
    )
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("-javaagent:${mockitoAgent.asPath}")
}

tasks.named<BootJar>("bootJar") {
    archiveFileName = "${project.name}.jar"
}
