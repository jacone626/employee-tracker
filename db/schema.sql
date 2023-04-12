DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
id INT NOT NULL PRIMARY KEY,
name VARCHAR(30) to hold department name
);

CREATE TABLE role (
id INT NOT NULL PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT NOT NULL PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
ON DELETE SET NULL,
manager_id INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
);