const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // port: 3001,
    user: "root",
    password: "",
    database: "orgchart_db",
  },
  console.log(`Connected to the orgchart_db database.`)
);

function init() {
  // starting menu options
  function startMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message:
            "Welcome to Lord of the Employees - the employee tracker program. \n What would you like to do?",
          name: "mainMenu",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
          ],
        },
      ])
      .then(function (input) {
        switch (input.action) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Update an employee role":
            updateEmployeeRole();
            break;
          case "Exit":
            exit();
            break;
        }
      });
  }
  startMenu();
};

// Action Functions 

// View all departments
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments(){
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        
    console.log(res);
    console.table(res);
    startMenu();
  
});}

// View all roles
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles(){};

// View all employees
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees(){};

// Add a department
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment(){};

// Add a role
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole(){};

// Add an employee
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee(){};

// Update an employee role
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole(){};

// Exit
function exit(){};

// init program
init();
