FROM maven:3-eclipse-temurin-17-alpine AS build
COPY . .
RUN mvn clean package -DskipTests -Pprod

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /target/.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]