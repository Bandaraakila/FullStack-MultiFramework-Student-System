package com.imbs.courseapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class CourseapiApplication {

    private final Environment env;

    public CourseapiApplication(Environment env) {
        this.env = env;
    }

    public static void main(String[] args) {
        SpringApplication.run(CourseapiApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        String port = env.getProperty("server.port", "8080");
        System.out.println("\n----------------------------------------------------------");
        System.out.println("Application is running!");
        System.out.println("Swagger UI: http://localhost:" + port + "/swagger-ui/index.html");
        System.out.println("API Base URL: http://localhost:" + port + "/api");
        System.out.println("----------------------------------------------------------\n");
    }
}