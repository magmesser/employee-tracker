const inquirer = require("inquirer");
const mysql = require("mysql2");
const chalk = require("chalk");
const cTable = require("console.table");
const prompts = require("./config/inquirer");

// Connection function
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "orgchart_db",
  },
  console.log(chalk.blue(`Connected to the orgchart_db database. \n`))
);

function init() {
  // Starting menu options
  function startMenu() {
    inquirer.prompt(prompts.startMenuPrompt).then(function (answer) {
      switch (answer.mainMenu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "View all employees by manager":
          viewEmpManager();
          break;
        case "View all employees by department":
          viewEmpDepartment();
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

  // Action Functions

  // View all departments
  function viewDepartments() {
    const sql = `SELECT department.id AS ID, department.name AS Department 
  FROM department`;
    db.query(sql, (err, res) => {
      if (err) throw err;

      console.log(chalk.magenta(`\n *Now Viewing: All Departments* \n`));
      console.table(res);
      startMenu();
    });
  }

  // View all roles
  function viewRoles() {
    const sql = `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department
  FROM role
  INNER JOIN department
  ON role.department_id = department.id
  ORDER BY role.salary DESC;
  `;
    db.query(sql, (err, res) => {
      if (err) throw err;

      console.log(chalk.magenta(`\n *Now Viewing: All Roles* \n`));
      console.table(res);
      startMenu();
    });
  }

  // View all employees
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

      console.log(chalk.magenta(`\n *Now Viewing: All Employees* \n`));
      console.table(res);
      startMenu();
    });
  }

  // View all employees by manager
  function viewEmpManager() {
    const sql = `SELECT m.first_name AS Manager_First, m.last_name AS Manager_Last, e.first_name AS Employee_First, e.last_name AS Employee_Last 
    FROM employee AS m
    INNER JOIN employee AS e
    ON e.manager_id = m.id
    ORDER BY m.id;
  `;
    db.query(sql, (err, res) => {
      if (err) throw err;

      console.log(
        chalk.magenta(`\n *Now Viewing: All Employees by Manager* \n`)
      );
      console.table(res);
      startMenu();
    });
  }

  // View all employees by department
  function viewEmpDepartment() {
    const sql = `SELECT employee.first_name AS First, employee.last_name AS Last, department.name AS Department
    FROM employee
    INNER JOIN role
    ON employee.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id
    ORDER BY department.name;
  `;
    db.query(sql, (err, res) => {
      if (err) throw err;

      console.log(
        chalk.magenta(`\n *Now Viewing: All Employees by Department* \n`)
      );
      console.table(res);
      startMenu();
    });
  }

  // Add a department
  async function addDepartment() {
    const dept = await inquirer
      .prompt(prompts.addDeptPrompt)
      .then(function (answer) {
        const sql = `INSERT INTO department (name) VALUES ('${answer.dept}');`;
        db.query(sql, (err, res) => {
          if (err) throw err;
          console.log(
            chalk.bgGreen(`\n *New Department ~${answer.dept}~ Added* \n`)
          );
        });
      });

    viewDepartments();
  }

  // Add a role
  function addRole() {
    var dept = `SELECT * FROM department`;

    db.query(dept, function (err, res) {
      if (err) throw err;

      const departmentChoices = res.map(({ id, name }) => ({
        value: id,
        name: `${name}`,
      }));

      inquirer
        .prompt(prompts.addRolePrompt(departmentChoices))
        .then(function (answer) {
          const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.dept}')`;
          db.query(sql, (err, res) => {
            if (err) throw err;
            console.log(
              chalk.bgGreen(`\n *New Role ~${answer.title}~ Added* \n`)
            );
            viewRoles();
          });
        });
    });
  }

  // Add an employee
  function addEmployee() {
    var role = `SELECT id, title FROM role`;
    db.query(role, function (err, res) {
      if (err) throw err;

      const roleChoices = res.map(({ id, title }) => ({
        value: id,
        name: `${title}`,
      }));

      var manager = `SELECT id, first_name, last_name FROM employee`;
      db.query(manager, function (err, res) {
        if (err) throw err;

        const managerChoices = res.map(({ id, first_name, last_name }) => ({
          value: id,
          name: `${first_name} ${last_name}`,
        }));

        inquirer
          .prompt(prompts.addEmployeePrompt(roleChoices, managerChoices))
          .then(function (answer) {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role}', '${answer.manager}')`;
            db.query(sql, (err, res) => {
              if (err) throw err;
              console.log(
                chalk.bgGreen(
                  `\n *New Employee ~${answer.first_name} ${answer.last_name}~ Added* \n`
                )
              );
              viewEmployees();
            });
          });
      });
    });
  }

  // Update an employee role
  function updateEmployeeRole() {
    var role = `SELECT id, title FROM role`;
    db.query(role, function (err, res) {
      if (err) throw err;

      const roleChoices = res.map(({ id, title }) => ({
        value: id,
        name: `${title}`,
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
              console.log(chalk.bgGreen(`\n *Employee Role Updated* \n`));
              viewEmployees();
            });
          });
      });
    });
  }

  // Exit program
  function exit() {
    setTimeout(function () {
      console.log(
        chalk.blue.bold(
          `\n *Thank you for using Lord of the Employees - the employee tracker program.* \n`
        )
      );
      return process.exit(22);
    }, 2000);
  }
}
// Initiate program
init();
