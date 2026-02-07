package com.imbs.courseapi.controller;

import com.imbs.courseapi.entity.Course;
import com.imbs.courseapi.repository.CourseRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@SecurityRequirement(name = "JavaBearerAuth") // Matches OpenApiConfig
public class CourseController {
    @Autowired private CourseRepository repository;

    @GetMapping
    public List<Course> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Course getOne(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @PostMapping
    public Course create(@Valid @RequestBody Course course) {
        return repository.save(course);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @Valid @RequestBody Course details) {
        Course course = repository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        course.setCourseName(details.getCourseName());
        course.setDescription(details.getDescription());
        course.setDuration(details.getDuration());
        course.setFee(details.getFee());
        return repository.save(course);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}