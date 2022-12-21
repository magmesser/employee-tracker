-- Query of Employee and Role Title
SELECT employee.first_name AS First, employee.last_name AS Last, role.title AS Title
FROM employee
INNER JOIN role
ON employee.role_id = role.id;

-- Query of Employees and Managers
SELECT m.first_name AS Manager_First, m.last_name AS Manager_Last, e.first_name AS Employee_First, e.last_name AS Employee_Last 
FROM employee AS m
INNER JOIN employee AS e
ON e.manager_id = m.id
ORDER BY m.id;

-- Query of Employees and Departments
SELECT employee.first_name AS First, employee.last_name AS Last, department.name AS Department
FROM employee
INNER JOIN role
ON employee.role_id = role.id
INNER JOIN department
ON role.department_id = department.id
ORDER BY department.name;