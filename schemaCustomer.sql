DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Glasses", "Apparel", 120, 1),
    ("Handbag", "Apparel", 240, 9),
    ("Socks", "Apparel", 100, 10),
    ("Pear", "Food", 9, 12),
    ("Strawberry", "Food", 10, 20),
    ("Milk", "Drink", 6, 5);

SELECT * FROM products;