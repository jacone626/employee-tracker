const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);


function questions () {
  inquirer.prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      name: "options",
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
      ]
    })
  .then((data) => {
    switch(data.options) {
        case "View All Employees":
          viewAllEmployees();
          break;
      
        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Quit":
          quitDatabase();
          break;
    }
  })
};

questions();

//View All Employees
function viewAllEmployees () {
  const query = 
`SELECT employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary, CONCAT (m.first_name, " ", m.last_name) AS manager
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT JOIN employee m ON employee.manager_id = m.id;`;

  db.query(query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    questions();
  }
)};

//Add Employee
function addEmployee () {
  inquirer.prompt(
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: 'list',
      message: "What is the employee's role?",
      name: "role",
      choices: 'x'
    },
    {
      type: 'list',
      message: "Who is the employee's manager",
      name: "manager",
      choices: "x"
    },
  )

  db.query('Add Employee', function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    questions();
  }
)};

//Update Employee Role
const updateEmployeeRole = 1

//View All Roles
function viewAllRoles() {
  db.query('SELECT * FROM roles', function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    questions();
  }
)};

//Add Role
const addRole = 1

//View All Departments
function viewAllDepartments () {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    questions();
  }
)};

//Add Department
const addDepartment = 1

//Quit
function quitDatabase() {
  db.end()
}


app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  