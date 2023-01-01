module.exports = {
  // Start Menu
  startMenuPrompt: {
    type: "list",
    message:
      "Welcome to Lord of the Employees - the employee tracker program. \n What would you like to do?",
    name: "mainMenu",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "View all employees by manager",
      "View all employees by department",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  },

  // Add Prompts: Department, Role, Employee:

  // Add Department
  addDeptPrompt: {
    type: "input",
    name: "dept",
    message: "What is the name of the new department?",
  },

  // Add Role
  addRolePrompt: (departmentChoices) => [
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
      choices: departmentChoices,
    },
  ],

  // Add Employee
  addEmployeePrompt: (roleChoices, managerChoices) => [
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the new employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the new employee?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the new employee's role or job title?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the new employee's manager?",
      choices: managerChoices,
    },
  ],

  // Update Prompts
  // Update Employee Role
  updateEmployeePrompt: (employeeChoices, roleChoices) => [
    {
      type: "list",
      name: "employee",
      message: "Which employee's role will be updated?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's new role or job title?",
      choices: roleChoices,
    },
  ],

  // Delete Prompts - to be added later
};
