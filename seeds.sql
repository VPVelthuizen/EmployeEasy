-- Create the roles table
CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    salary DECIMAL(10, 2),
    department_id INT
);

-- Insert a sample role
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 100000.00, 1);