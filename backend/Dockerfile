# syntax=docker/dockerfile:1
# Build from the backend/ Gradle root.
#   Local (compose) — compile from source:
#     docker build -t configuration-panel-backend backend/
#   CI/release — reuse the build-once output (build/libs/backend.jar already produced):
#     docker build --build-arg BUILD_MODE=ci -t configuration-panel-backend backend/
# BuildKit (default since Docker 23.0) skips the unused build stage entirely.
ARG BUILD_MODE=local

# --- local: compile from source ---
FROM --platform=$BUILDPLATFORM eclipse-temurin:21-jdk-alpine AS build-local
WORKDIR /workspace
COPY . .
RUN chmod +x ./gradlew && ./gradlew bootJar --no-daemon

# --- ci: reuse the pre-built boot jar from the context (build-once); no compile ---
FROM alpine AS build-ci
WORKDIR /workspace
COPY build/libs/backend.jar ./build/libs/backend.jar

# --- select the build source via BUILD_MODE; BuildKit prunes the other stage ---
FROM build-${BUILD_MODE} AS build

FROM eclipse-temurin:21-jre-alpine AS image

# Create non-root user
RUN addgroup -S -g 1001 appgroup && adduser -S -u 1001 -G appgroup -H appuser

# Copy the Spring Boot fat jar with proper ownership
COPY --chown=1001:1001 --from=build /workspace/build/libs/backend.jar /opt/app.jar

# Switch to non-root user
USER 1001

EXPOSE 8080

LABEL org.opencontainers.image.description="NL Portal Configuration Panel Backend."

# No debug agent: set JAVA_TOOL_OPTIONS (e.g. in compose) to debug a local container.
ENTRYPOINT ["java", "-jar", "/opt/app.jar"]
