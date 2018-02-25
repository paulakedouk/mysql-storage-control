var mysql = require("mysql");
var inquirer = require("inquirer");
var Table= require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);

  products();
});

function products() {
     connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ID', 'Product','Department', 'Price','Stock Qtd'],
            colWidths: [15, 15, 15, 15, 15]
        });

        // table is an Array, so you can `push` , `unshift`, `splice` and friends
        for( i = 0; i < res.length; i++){
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
             );
        }

        console.log(table.toString());
     })

    //  inquirer
    // .prompt({
    //   type: "input",
    //   name: "artist",
    //   message: "What is the ID of the item you would like to purchase?"
    // })
    // .then(function(answer) {
    //   var query = "SELECT * FROM products";
    //   connection.query(query, function(err, res) {
    //     if (err) throw err;


    //     for (var i = 0; i < res.length; i++) {
    //       console.log(res[i]);
    //     }
    //   });
    // });
}
