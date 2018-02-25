var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazonManager"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

    menu();
});

function menu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "managerInput",
                message: "What would you like to do?",
                choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product']
            }
        ]).then(function (input) {
            switch (input.managerInput) {
                case "View products for sale":
                    return viewProducts();

                case "View low inventory":
                    // function
                    break;

                case "Add to inventory":
                    // function
                    break;

                case "Add new product":
                    // function
                    break;
            }
        })
}

function viewProducts() {
     connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ID', 'Product', 'Sale', 'Department', 'Price', 'Stock'],
            colWidths: [5, 15, 10, 20, 10, 10]
        });

        // table is an Array, so you can `push` , `unshift`, `splice` and friends
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].product_sales, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());
        menu();
    })
}