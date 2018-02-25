DROP DATABASE IF EXISTS bamazonManager;
CREATE DATABASE bamazonManager;

USE bamazonManager;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  product_sales INT default 0,
  department_name VARCHAR(100) NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUES  ("Glasses", 1, "Apparel", 120, 3),
    ("PlayStation 4", 2, "Video Game", 400, 9),
    ("Monopoly", 5, "Board Games", 20, 10),
    ("Pizza", 4, "Food and Drink", 10, 4),
    ("Shampoo", 5, "Necessities", 12, 20),
    ("Titanic", 0, "Films", 6, 5);

SELECT * FROM products;