package com.imbs.courseapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "Courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CourseId")
    private Long courseId;

    @NotBlank(message = "Course name is required")
    @Column(name = "CourseName")
    private String courseName;

    @NotBlank(message = "Description is required")
    @Column(name = "Description")
    private String description;

    @NotBlank(message = "Duration is required")
    @Column(name = "Duration")
    private String duration;

    @NotNull(message = "Fee is required")
    @Positive(message = "Fee must be greater than zero")
    @Column(name = "Fee")
    private Double fee;
}