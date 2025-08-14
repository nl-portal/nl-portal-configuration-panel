FROM eclipse-temurin:21-jre-ubi10-minimal

ADD build/libs/backend.jar /opt/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/opt/app.jar"]
