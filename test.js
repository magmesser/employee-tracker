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

// insert test function here

function viewRoles() {
    const sql = `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department
    FROM role
    INNER JOIN department
    ON role.department_id = department.id
    ORDER BY role.salary DESC;
    `;
    db.query(sql, (err, res) => {
      if (err) throw err;
  
      console.log(`\n *Now Viewing: All Roles* \n`);
      console.table(res);
    //   startMenu();
    });
  };
// THEN I am prompted to enter the title, salary, and department (department_id) for the role and that role is added to the database
async function addRole() {
  const dept = await inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "dept",
        message: "What department is the new role under?",
        choices: departments,
      }
    ])
    .then(function(answer){

      const sql = `INSERT INTO department (name) VALUES ('${answer.dept}');`;
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(`\n *New Department ~${answer.dept}~ Added* \n`);
      });
    })

    viewRoles();
  //   startMenu();
};

addRole();
