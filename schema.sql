DROP DATABASE IF EXISTS top_songsDB;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;
