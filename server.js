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

  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id`, function (err, results) {
    if (err) {
      console.log(err);
      }

  inquirer.prompt([
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
      choices: results.map((roles) => roles.title)
    },
    {
      type: 'list',
      message: "Who is the employee's manager",
      name: "manager",
      choices: results.map((employee) => `${employee.first_name} ${employee.last_name}`)
    },
  ])
  // .then((data) =>

//   db.query('Add Employee', function (err, results) {
//     if (err) {
//       console.log(err);
//     }
//     console.table(results);
//     questions();
//   })
})
}


//Update Employee Role
function updateEmployeeRole() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee JOIN roles ON employee.role_id = roles.id`, function (err, results) {
    if (err) {
      console.log(err);
      }
  inquirer.prompt([
    {
      type: 'list',
      message: "Which employee's role do you want to update?",
      name: "employee",
      choices: results.map((employee) => `${employee.first_name} ${employee.last_name}`)
    },
    {
      type: 'list',
      message: "Which role do you want to assign the selected employee?",
      name: "role",
      choices: results.map((roles) => `${roles.title}`)
    },
  ])
    .then((data) => {
    const params = [data.role, data.employee]

    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, params, function (err, results) {
    if (err) {
      console.log(err);
      }
      console.log(`Updated employee's role.`);
      questions();
    })
  })
})
};

//View All Roles
function viewAllRoles() {
  const query = 
  `SELECT roles.id, roles.title, department.department_name, roles.salary
  FROM roles
  JOIN department ON roles.department_id = department.id;`;

  db.query(query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    questions();
  }
)};

//Add Role

function addRole() {
  db.query(`Select * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      }
  inquirer.prompt([
    {
      type: 'input',
      message: "What is the name of the role?",
      name: "roleName",
    },
    {
      type: 'input',
      message: "What is the salary of the role?",
      name: "roleSalary",
    },
    {
      type: 'list',
      message: "Which department does the role belong to?",
      name: "roleDepartment",
      choices: results.map((department) => department.department_name
      )
    },
  ])
    .then((data) => {
    const params = [data.roleName, data.roleSalary, data.roleDepartment]

    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, params, function (err, results) {
    if (err) {
      console.log(err);
      }
      console.log(`Added ${data.roleName} to the database.`);
      questions();
    })
  })
})
};


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
function addDepartment () {
  inquirer.prompt(
    {
      type: 'input',
      message: "What is the name of the department?",
      name: "departmentName",
    })
    .then((data) => {
    db.query(`INSERT INTO department (department_name) VALUES ("${data.departmentName}")`, function (err, results) {
    if (err) {
      console.log(err);
      }
      console.log(`Added ${data.departmentName} to the database.`);
      questions();
    })
  })
};


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
  