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
  inquirer.prompt([
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
    }
  ])
}

questions();

//Add Employee
const addEmployee = x

//Update Employee Role
const updateEmployeeRole = x

//View All Roles
const viewAllRoles = db.query('SELECT * FROM roles', function (err, results) {
  console.log(results);
  viewAllRoles();
});

//Add Role
const addRole = x

//View All Departments
const viewAllDepartments = x

//Add Department
const addDepartment = x 

//Quit
const quitDatabase = x


app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  