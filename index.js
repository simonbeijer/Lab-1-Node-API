const express = require('express');
const app = express();
const chalk = require('chalk');

const server = [{
    running :'The server is running',
    port: 3000,
}]



app.use(express.json())
// Server endpoints
app.get('/', (req, res) => {
    res.json('Tja')
});










// Server listen
app.listen(3000, 'localhost', () => {
    let str;
    str  = "+------------------------+----------+\n";
    str += "|   Is server running    |  Port    |\n";
    str += "|------------------------|----------|\n";
    for(const row of server) {
        str += "| ";
        str += chalk.green(row.running.padEnd(23));
        str += "| ";
        str += chalk.blue(row.port.toString().padEnd(8));
        str += " |\n";
    }
    str += "+------------------------+----------+\n";
    console.log(chalk.bgBlack(str))
});
