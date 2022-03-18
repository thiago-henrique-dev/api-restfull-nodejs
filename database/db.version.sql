create database Eccomerce;


CREATE TABLE IF NOT EXISTS products (
	productId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
    price FLOAT,
    productImage VARCHAR(255)
    );
    
    CREATE TABLE IF NOT EXISTS orders (
	orderId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    quantity FLOAT,
	FOREIGN KEY (productId) REFERENCES products(productId)
    );
    
    CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(100),
    password VARCHAR(100)
    );
	CREATE TABLE IF NOT EXISTS productImages (
	imageId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    path VARCHAR(255),
    FOREIGN KEY (productId) REFERENCES products (productId)
    );
    
    