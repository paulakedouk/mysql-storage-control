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
        ]).then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    // function
                    break;

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