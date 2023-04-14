INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 150000, 1),
       ("Junior Sales", 100000, 1),
       ("Lead Engineer", 200000, 2),
       ("Junior Engineer", 120000, 2),
       ("Finance Manager", 140000, 3),
       ("Finance Analyst", 80000, 3),
       ("Lawyer", 200000, 4),
       ("Paralegal", 90000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Davis", 1, null),
       ("Sarah", "Thompson", 2, 1),
       ("Tom", "Stevens", 3, null),
       ("Dave", "Woods", 4, 3),
       ("Austin", "Smith", 5, null),
       ("Mark", "Andrews", 6, 5),
       ("Lisa", "Paul", 7, null),
       ("Paula", "Conway", 8, 7);
