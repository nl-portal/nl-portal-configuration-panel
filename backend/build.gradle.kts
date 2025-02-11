val ehcacheVersion="3.10.8"
val hypersistenceVersion="3.8.3"
val postgresVersion="42.7.4"
val guavaVersion="33.4.0-jre"
val springCloudServerVersion="4.2.0"
val kotlinLoggingVersion="7.0.3"

plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.4.2"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "nl.nlportal"
version = "0.0.1-SNAPSHOT"

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
	implementation("org.springframework.cloud:spring-cloud-config-server:$springCloudServerVersion")
	implementation("org.springframework.cloud:spring-cloud-starter-bootstrap:$springCloudServerVersion")

	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.liquibase:liquibase-core")
	implementation("org.ehcache:ehcache:$ehcacheVersion")
	implementation("io.hypersistence:hypersistence-utils-hibernate-62:$hypersistenceVersion")
	implementation("org.postgresql:postgresql:$postgresVersion")
	implementation("com.github.ben-manes.caffeine:caffeine")
	implementation("com.google.guava:guava:$guavaVersion")

	implementation("io.github.oshai:kotlin-logging-jvm:$kotlinLoggingVersion")

	testImplementation("org.junit.jupiter:junit-jupiter")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

tasks.bootRun {
	environment.set("spring.datasource.url", "jdbc:postgresql://localhost:54322/nl-portal-config")
	environment.set("spring.datasource.username", "config")
	environment.set("spring.datasource.password", "password")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
