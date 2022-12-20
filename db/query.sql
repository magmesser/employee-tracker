SELECT employee.first_name AS First, employee.last_name AS Last
FROM employee
INNER JOIN role
ON employee.role_id = role_id;
