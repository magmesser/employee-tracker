INSERT INTO
    department (name)
VALUES
    ("Executive"),
    ("Legal"),
    ("Project Management"),
    ("Creative");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("President", 200000, 1),
    ("Vice President", 150000, 1),
    ("Director of Legal", 100000, 2), 
    ("Legal Manager", 75000, 2),
    ("Attorney", 60000, 2),
    ("Director of Project Management", 100000, 3),
    ("Project Manager", 75000, 3),
    ("Project Coordinator", 50000, 3),
    ("Director of Creative", 100000, 4),
    ("Content Manager", 75000, 4),
    ("Web Developer", 60000, 4),
    ("Graphic Designer", 60000, 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Gandalf", "the Grey", 1, null),
    ("Bilbo", "Baggins", 2, 1),
    ("Aragorn", "Elessar II", 3, 1),
    ("Legolas", "Greenleaf", 4, 3),
    ("Gimli", "son of Gloin", 5, 4),
    ("Galadriel", "Lothlorien", 6, 1),
    ("Elrond", "Rivendell", 7, 6),
    ("Arwen", "Undomiel", 8, 7),
    ("Samwise", "Gamgee", 9, 1),
    ("Frodo", "Baggins", 10, 9),
    ("Meriadoc", "Brandybuck", 11, 9),
    ("Peregrin", "Took", 12, 9);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;