-- 1. Create the Database
CREATE DATABASE CourseDB;
USE CourseDB;

-- 2. Create Courses Table
CREATE TABLE Courses (
    CourseId INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(255) NOT NULL,
    Description TEXT,
    Duration VARCHAR(50), -- e.g., '6 Months'
    Fee DECIMAL(10, 2) NOT NULL
);

-- Seed data for testing
INSERT INTO Courses (CourseName, Description, Duration, Fee)
VALUES 
('Full Stack Development', 'Learn Angular, React, and .NET', '6 Months', 55000.00),
('Java Enterprise', 'Deep dive into Spring Boot', '4 Months', 45000.00);