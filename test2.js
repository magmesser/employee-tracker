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
}
// THEN I am prompted to enter the title, salary, and department (department_id) for the role and that role is added to the database
function addRole() {
	var query = `SELECT * FROM department`;

	db.query(query, function (err, res) {
		if (err) throw err;
	
		const departmentChoices = res.map(({ id, name }) => ({
			value: id,
			name: `${id} ${name}`,
		}));

		inquirer
			.prompt(prompts.addRolePrompt(departmentChoices))
			.then(function (answer) {
                // ***different 
				var query = `INSERT INTO role SET ?`;
				// Insert Title, Salary and Department into Role Array
				db.query(
					query,
					{
						title: answer.title,
						salary: answer.salary,
						department_id: answer.dept,
					},
					function (err, res) {
						if (err) throw err;

						console.log("\n" + res.affectedRows + " role created");
						console.log("\n<<<<<<<<<<<<<<<<<<<< ⛔ >>>>>>>>>>>>>>>>>>>>\n");

						viewRoles();
					},
				);
			});
	});
};
addRole();
