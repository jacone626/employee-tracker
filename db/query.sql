SELECT roles.title, department.department_name, roles.salary
FROM roles
JOIN department ON roles.department_id = department.id
