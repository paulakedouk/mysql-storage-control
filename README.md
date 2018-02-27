# Node.js & MySQL

This is an interactive shopping node application using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package to allow users to purchase items as a customer, view, track and update the product inventory as a manager.

### Customer Interface

<img src="/gifs/bamazonCustomer.gif">

The customer interface allows users to view the current items available for purchase, descriptions, department in which the item is located and price. The user will be able to purchase one of the existing items by entering the item ID and the desired quantity. If the item is in stock, the order will be completed and the user will see the total amount of their purchase.

To run the Customer interface please follow the steps below:

    git clone git@github.com:paulakedouk/mysql-storage-control.git
    cd mysql-storage-control
    node bamazonCustomer.js

### Manager Interface

<img src="/gifs/bamazonManager.gif">

The manager interface presents a list of four options, as below:

    ? What would you like to do? (Use arrow keys)
    ❯ View products for sale
    View low inventory
    Add to inventory
    Add new product
    Quit

**View products for sale** allows the user to see a list of products that are currently for sale and some details like: tem IDs, descriptions, department, price and the quantity available in stock.

**View low inventory** allows the user to see a list of all items that have less than 5 units available.

**Add to inventory** allows the user to update the inventory with selected ID and how many items the user wishes to increase.

**Add new product** allows the user to add a new product with details to the inventory and will be entered into the database.

To run the Manager interface please follow the steps below:

    git clone git@github.com:paulakedouk/mysql-storage-control.git
    cd mysql-storage-control
    node bamazonManager.js

### Build with

* JavaScript
* Node.js
* MySQL
* npm packages:
  * mysql
  * inquirer
  * cli-table
