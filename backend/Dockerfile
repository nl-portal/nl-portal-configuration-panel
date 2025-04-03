FROM eclipse-temurin:21.0.6_7-jre-alpine

ADD build/libs/backend-0.1.0.jar /opt/app.jar

EXPOSE 8888

ENTRYPOINT ["java", "-jar", "/opt/app.jar"]
