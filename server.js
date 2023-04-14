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
        'Updated Employee Role',
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




app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  