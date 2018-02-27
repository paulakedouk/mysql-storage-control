var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',

  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);

  products();
});

function showTable() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'Stock'],
      colWidths: [5, 15, 20, 10, 10]
    });

    // table is an Array, so you can `push` , `unshift`, `splice` and friends
    for (i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }

    console.log(table.toString());
  });
}

function products() {
  showTable();

  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'item',
          message: 'What is the ID of the item you would like to purchase? [Quit with Q]',
          validate: function(value) {
            if (value >= 0 && value <= 10) {
              return true;
            } else if (isNaN(value) === false) {
              return true;
            } else if (value == 'Q' || value === 'q') {
              console.log('\nThank you! See you next time.');
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
          validate: function(value) {
            if (isNaN(value)) {
              return 'Please enter a valid item ID!';
            } else {
              return true;
            }
          }
        }
      ])
      .then(function(userInput) {
        var query = 'SELECT product_name, price, stock_quantity FROM products WHERE ?';
        connection.query(query, { id: userInput.item }, function(err, res) {
          if (err) throw err;

          // console.log('stock ' + res[0].stock_quantity)
          // console.log('user qnt ' + userInput.quantity)

          if (res[0].stock_quantity < userInput.quantity) {
            console.log('Sorry. Insufficient quantity! We only have ' + res[0].stock_quantity + ' item remaining!');
          } else {
            var stock = res[0].stock_quantity - userInput.quantity;

            connection.query(
              'UPDATE products SET ? WHERE ?',
              [
                {
                  stock_quantity: stock
                },
                {
                  id: userInput.item
                }
              ],
              function(error) {
                if (error) throw err;

                console.log('\nSucessfully purchased ' + userInput.quantity + ' ' + res[0].product_name + '!');
                console.log('Your total cost is: $' + res[0].price * userInput.quantity + '!\n');

                products();
              }
            );
          }
        });
      });
  });
}
