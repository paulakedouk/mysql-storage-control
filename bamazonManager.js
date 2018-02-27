var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',

  password: 'password',
  database: 'bamazonManager'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);

  menu();
});

function showTable(res) {
  var table = new Table({
    head: ['ID', 'Product', 'Sale', 'Department', 'Price', 'Stock'],
    colWidths: [5, 15, 10, 20, 10, 10]
  });

  // table is an Array, so you can `push` , `unshift`, `splice` and friends
  for (i = 0; i < res.length; i++) {
    table.push([
      res[i].id,
      res[i].product_name,
      res[i].product_sales,
      res[i].department_name,
      res[i].price,
      res[i].stock_quantity
    ]);
  }

  console.log(table.toString());
}

function menu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'managerInput',
        message: 'What would you like to do?',
        choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product', 'Quit']
      }
    ])
    .then(function(userInput) {
      switch (userInput.managerInput) {
        case 'View products for sale':
          return viewProducts();

        case 'View low inventory':
          return lowInventory();

        case 'Add to inventory':
          return addToInventory();

        case 'Add new product':
          // function
          break;

        case 'Quit':
          process.exit();
      }
    });
}

function viewProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    showTable(res);

    menu();
  });
}

function lowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res) {
    if (err) throw err;
    showTable(res);
    console.log('\nShowing all products with quantity lower than 5 above.\n');

    menu();
  });
}

function addToInventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    showTable(res);

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'addProduct',
          choices: function() {
            var choiceArr = [];
            for (var i = 0; i < res.length; i++) {
              choiceArr.push(res[i].product_name);
            }
            return choiceArr;
          },
          message: 'Which item would you like to add inventory?'
        },
        {
          type: 'input',
          name: 'quantity',
          message: 'How many items would you like to add??'
        }
      ])
      .then(function(userInput) {
        var chosen;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === userInput.addProduct) {
            chosen = res[i];
          }
        }
        // console.log(chosen);

        var newStock = parseInt(chosen.stock_quantity) + parseInt(userInput.quantity);
        // console.log(newStock);
        connection.query(
          'UPDATE products SET ? WHERE ?',
          [
            {
              stock_quantity: newStock
            },
            {
              id: chosen.id
            }
          ],
          function(error) {
            if (error) throw err;

            console.log(
              '\nInventory added! \nYou have successfully added ' +
                userInput.quantity +
                ' units of ' +
                chosen.product_name
            );
            console.log('Now you have ' + newStock + '\n units!');
            menu();
          }
        );
      });
  });
}
