const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const prompts = require("./config/inquirer");

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

// insert test function here
function viewEmployees() {
  const sql = `SELECT e.id AS ID, e.first_name AS Employee_First, e.last_name AS Employee_Last, role.title AS Title, department.name AS Department, role.salary AS Salary, m.first_name AS Manager_First, m.last_name AS Manager_Last
    FROM employee AS e
    INNER JOIN role
    ON e.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee AS m
    ON m.id = e.manager_id
    ORDER BY e.id;
    `;
  db.query(sql, (err, res) => {
    if (err) throw err;

    console.log(`\n *Now Viewing: All Employees* \n`);
    console.table(res);
    //   startMenu();
  });
}

// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

function addEmployee() {
    
  var role = `SELECT id, title FROM role`;
  db.query(role, function (err, res) {
    if (err) throw err;
    
    const roleChoices = res.map(({ id, title }) => ({
      value: id,
      name: `${id} ${title}`,
    }));

    var manager = `SELECT id, first_name, last_name FROM employee`;
    db.query(manager, function (err, res) {
      if (err) throw err;

      const managerChoices = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`,
      }));

      inquirer
        .prompt(prompts.addEmployeePrompt(roleChoices, managerChoices))
        .then(function (answer) {
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role}', '${answer.manager}')`;
          db.query(sql, (err, res) => {
            if (err) throw err;
            console.log(
              `\n *New Employee ~${answer.first_name} ${answer.last_name}~ Added* \n`
            );
            viewEmployees();
          });
        });
    });
  });
}

function updateEmployeeRole() {
  var role = `SELECT id, title FROM role`;
  db.query(role, function (err, res) {
    if (err) throw err;
    
    const roleChoices = res.map(({ id, title }) => ({
      value: id,
      name: `${id} ${title}`,
    }));

    var employee = `SELECT id, first_name, last_name FROM employee`;
    db.query(employee, function (err, res) {
      if (err) throw err;

      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`,
      }));

      inquirer
        .prompt(prompts.updateEmployeePrompt(employeeChoices, roleChoices))
        .then(function (answer) {
          const sql = `UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee}`;
          db.query(sql, (err, res) => {
            if (err) throw err;
            console.log(
              `\n *Employee Role Updated* \n`
            );
            viewEmployees();
          });
        });
    });
  });
};

updateEmployeeRole();
