DROP DATABASE IF EXISTS Office_Management;
CREATE DATABASE Office_Management;
USE Office_Management;

CREATE TABLE company(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Events(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    companyId INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(companyId) REFERENCES company(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT,
    employeeNumber VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(company_id) REFERENCES company(id)
);

CREATE TABLE tasks(
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) DEFAULT NULL,
    title VARCHAR(255) DEFAULT NULL,
    created DATETIME NOT NULL,
    assigned_to INT DEFAULT NULL,
    deadline DATETIME NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(assigned_to) REFERENCES users(id),
    FOREIGN KEY(company_id) REFERENCES company(id)
);

CREATE TABLE financials(
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) DEFAULT NULL,
    source VARCHAR(255) DEFAULT NULL,
    type BIT(1) NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(company_id) REFERENCES company(id)
);

CREATE TABLE Messages(
    id INT NOT NULL AUTO_INCREMENT,
    message_from INT NOT NULL,
    message_to INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(message_from) REFERENCES users(id),
    FOREIGN KEY(message_to) REFERENCES users(id),
    FOREIGN KEY(company_id) REFERENCES company(id)
);
