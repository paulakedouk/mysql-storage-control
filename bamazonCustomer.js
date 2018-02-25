var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

    products();
});

function products() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Stock Qtd'],
            colWidths: [15, 15, 15, 15, 15]
        });

        // table is an Array, so you can `push` , `unshift`, `splice` and friends
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        console.log(table.toString());

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "item",
                    message: "What is the ID of the item you would like to purchase? [Quit with Q]",
                    validate: function (value) {
                        if (value >= 0 && value <= 10) {
                            return true;
                        } else if (isNaN(value) === false) {
                            return true;
                        } else if (value == "Q") {
                            console.log("\nThank you! Bye.")
                            process.exit();
                        } else {
                            return 'Please enter a valid item ID!';
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many units of the product would you like? [Quit with Q]',
                    validate: function (value) {
                        if (isNaN(value)) {
                            return 'Please enter a valid item ID!';
                        } else {
                            return true;
                        }
                    }

                }

            ])
            .then(function (userInput) {
                var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
                connection.query(query, { id: userInput.item }, function (err, res) {
                    if (err) throw err;

                    console.log('stock ' + res[0].stock_quantity)
                    console.log('user qnt ' + userInput.quantity)
                });
            });
    })


}
