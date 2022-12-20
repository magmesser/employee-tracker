DROP DATABASE IF EXISTS orgchart_db;

CREATE DATABASE orgchart_db;

USE orgchart_db;

CREATE TABLE
    department (
        id INT AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY(id)
    );

CREATE TABLE
    role (
        id INT AUTO_INCREMENT,
        title VARCHAR(35) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE,
        PRIMARY KEY(id)
    );

CREATE TABLE
    employee (
        id INT AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        FOREIGN KEY (role_id) 
        REFERENCES role(id) 
        ON DELETE CASCADE,
        manager_id INT,
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL, 
        PRIMARY KEY(id)
    );

-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)