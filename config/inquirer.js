module.exports = {
  // Add Prompts
  // Add Department
  insertDepartment: {
    // Create New Departments Name
    name: "department",
    type: "input",
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

  // Update Prompts
  // Delete Prompts
};
