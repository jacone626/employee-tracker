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


const questions = function() {
  inquirer.prompt(
    {
      type: 'list',
      message: 'What would you like to do?',
      name: "options",
      choices: [
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

//Add Employee
const addEmployee = 1

//Update Employee Role
const updateEmployeeRole = 1

//View All Roles
const viewAllRoles = db.query('SELECT * FROM roles', function (err, results) {
  console.log(results);
  viewAllRoles();
});

//Add Role
const addRole = 1

//View All Departments
const viewAllDepartments = 1

//Add Department
const addDepartment = 1

//Quit
const quitDatabase = 1


app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  