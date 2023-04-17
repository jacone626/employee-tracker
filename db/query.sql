SELECT employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary, CONCAT (m.first_name, " ", m.last_name) AS manager
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT JOIN employee m ON employee.manager_id = m.id;

