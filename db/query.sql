SELECT employee.id, employee.first_name, employee.last_name, roles.title 
FROM employee 
JOIN roles ON employee.role_id = roles.id