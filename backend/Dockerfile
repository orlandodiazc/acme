FROM maven:3-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17
COPY --from=build /target/*.jar app.jar
COPY src/test/java/com/ditod/acme/fixtures/images images
EXPOSE 8080
ENTRYPOINT ["java", "-jar","app.jar"]