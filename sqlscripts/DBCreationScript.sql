DROP DATABASE IF EXISTS	VendingMachine;
CREATE DATABASE VendingMachine;

USE VendingMachine;

CREATE TABLE `Products` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `cost` DECIMAL(10, 2) NOT NULL,
    `quantity` INT NOT NULL
);