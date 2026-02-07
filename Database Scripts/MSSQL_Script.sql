-- 1. Create the Database
CREATE DATABASE StudentDB;
GO

USE StudentDB;
GO

-- 2. Create Students Table
CREATE TABLE Students (
    StudentId INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    ContactNumber NVARCHAR(20) NOT NULL
);
GO

-- 3. Create Enrollment Table 
-- Note: CourseId is stored as an INT here, but the actual data lives in MySQL.
CREATE TABLE Enrollments (
    EnrollmentId INT PRIMARY KEY IDENTITY(1,1),
    StudentId INT NOT NULL,
    CourseId INT NOT NULL, -- This refers to the ID in the MySQL DB
    EnrollmentDate DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Student_Enrollment FOREIGN KEY (StudentId) REFERENCES Students(StudentId) ON DELETE CASCADE
);
GO

-- Seed data for testing
INSERT INTO Students (FullName, Email, DateOfBirth, ContactNumber)
VALUES ('Akila Abeykoon ', 'akilacome8@gmail.com', '2000-05-15', '0710364296');