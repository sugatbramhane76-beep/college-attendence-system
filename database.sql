CREATE DATABASE college_attendance;

USE college_attendance;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    division VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_code VARCHAR(30) NOT NULL UNIQUE,
    subject_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present','Absent') NOT NULL,

    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE,

    FOREIGN KEY (subject_id)
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    UNIQUE(student_id, subject_id, attendance_date)
);

INSERT INTO students
(roll_no, name, department, semester, division)
VALUES
('IT001', 'Rahul Patil', 'Information Technology', 5, 'B'),
('IT002', 'Priya Sharma', 'Information Technology', 5, 'B'),
('IT003', 'Amit Joshi', 'Information Technology', 5, 'B');

INSERT INTO subjects
(subject_code, subject_name)
VALUES
('CS501', 'Database Management System'),
('CS502', 'Computer Networks'),
('CS503', 'Software Engineering');