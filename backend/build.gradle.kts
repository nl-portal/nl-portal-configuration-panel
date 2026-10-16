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

import org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21
import org.springframework.boot.gradle.tasks.bundling.BootJar

val ehcacheVersion by project.properties
val postgresVersion by project.properties
val springCloudServerVersion by project.properties
val springCloudBootstrapVersion by project.properties
val kotlinLoggingVersion by project.properties
val apacheTikaVersion by project.properties
val mockitoAgent = configurations.create("mockitoAgent")

plugins {
    kotlin("jvm")
    kotlin("plugin.spring")
    id("org.springframework.boot")
    id("io.spring.dependency-management")

    // Checkstyle
    id("com.diffplug.spotless")
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
    implementation("org.springframework.boot:spring-boot-starter-security-oauth2-resource-server")
    implementation("org.springframework.cloud:spring-cloud-config-server:$springCloudServerVersion")
    implementation("org.springframework.cloud:spring-cloud-starter-bootstrap:$springCloudBootstrapVersion")

    implementation("tools.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.springframework.boot:spring-boot-liquibase")
    implementation("org.liquibase:liquibase-core")
    implementation("org.ehcache:ehcache:$ehcacheVersion")
    implementation("org.postgresql:postgresql:$postgresVersion")
    implementation("com.github.ben-manes.caffeine:caffeine")
    implementation("org.apache.tika:tika-core:$apacheTikaVersion")

    implementation("io.github.oshai:kotlin-logging-jvm:$kotlinLoggingVersion")

    // CVE-2025-48924
    implementation("org.apache.commons:commons-lang3:3.20.0")

    // CVE-2020-36843
    // Does not affect this application. No fix available.

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.boot:spring-boot-starter-webclient-test")
    testImplementation("org.springframework.boot:spring-boot-webtestclient")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testImplementation("org.mockito.kotlin:mockito-kotlin:6.3.0")
    testImplementation("com.h2database:h2:2.4.240")

    mockitoAgent("org.mockito:mockito-core:5.16.1") { isTransitive = false }
}

val ktlintRules =
    mapOf(
        "ktlint_standard_import-ordering" to "disabled",
        "ktlint_standard_property-naming" to "disabled",
        "ktlint_standard_max-line-length" to "disabled",
        "ktlint_standard_no-wildcard-imports" to "disabled",
        "ktlint_standard_package-name" to "disabled",
        "ij_kotlin_allow_trailing_comma_on_call_site" to "true",
        "ij_kotlin_allow_trailing_comma" to "true",
        "insert_final_newline" to "true",
    )

spotless {
    kotlin {
        ktlint().editorConfigOverride(ktlintRules)
        licenseHeaderFile("licenses/kt.template")
    }
    kotlinGradle {
        target("*.gradle.kts")
        ktlint().editorConfigOverride(ktlintRules)
        licenseHeaderFile("licenses/kts.template", "\\w.*")
    }
}

kotlin {
    compilerOptions {
        jvmTarget = JVM_21
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

tasks.bootRun {
    // Running from sources reads only backend/.env.properties (copy it from .env.properties.example).
    val envFile = project.file(".env.properties")
    doFirst {
        if (!envFile.isFile) {
            throw GradleException(
                "Missing ${envFile.path}. Copy .env.properties.example to .env.properties and adjust it for your machine.",
            )
        }
        environment.putAll(
            envFile
                .readLines()
                .map { it.trim() }
                .filterNot { it.isEmpty() || it.startsWith("#") || it.startsWith("//") }
                .associate { line ->
                    val parts = line.split("=", limit = 2)
                    parts[0].trim() to parts.getOrElse(1) { "" }.trim()
                },
        )
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("-javaagent:${mockitoAgent.asPath}")
}

tasks.named<BootJar>("bootJar") {
    archiveFileName = "${project.name}.jar"
}
