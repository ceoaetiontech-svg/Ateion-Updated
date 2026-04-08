# --- Stage 1: Build the application ---
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 1. Copy only the pom.xml to download dependencies (improves build speed)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy the source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Run the application ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 3. Copy only the compiled JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# 4. Expose the port (Render will override this, but it's good practice)
EXPOSE 8080

# 5. Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]