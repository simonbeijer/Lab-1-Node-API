const express = require('express');
const app = express();
const chalk = require('chalk');
const fs = require('fs');

const server = [{
    running: 'Server is running!',
    port: 3000,
}]

app.use(express.json());
app.use(express.static('public'));


// Array of data
const guitars = [{
    id: 1,
    name: 'fender',
    color: 'svart',
}, {
    id: 2,
    name: 'hagströms',
    color: 'beige',
}]



// All routes

// Get 

// All guitas
app.get('/guitars', (req, res) => {
    res.json(guitars);
});

// One guitar
app.get('/guitars/:guitarId', (req, res) => {
    const foundGuitar = guitars.find((guitars) => {
        if (guitars.id.toString() === req.params.guitarId.toString()) {
            return true;
        } else {
            return false;
        }
    })

    if (!foundGuitar) {
        res.status(404).send();
    } else {
        console.log("server res working")
        res.status(201).send(foundGuitar);
    }

});


// Post

// Add guitar
app.post('/guitars', (req, res) => {
    const guitar = {
        id: guitars.length + 1,
        name: req.body.name,
        color: req.body.color
    };

    if (!guitar) {
        res.status(404).send();
    } else {
        guitars.push(guitar);
        res.status(201).send(guitar);

    }
})

// Put


// Delete














// Server listen
app.listen(3000, 'localhost', () => {
    portRuninng()
});



// Styled cli
function portRuninng() {
    let str;
    str = "+------------------------+----------+\n";
    str += "|  Is server running?    |  Port    |\n";
    str += "|------------------------|----------|\n";
    for (const row of server) {
        str += "| ";
        str += chalk.green(row.running.padEnd(23));
        str += "| ";
        str += chalk.blue(row.port.toString().padEnd(8));
        str += " |\n";
    }
    str += "+------------------------+----------+\n";
    console.log(chalk.bgBlack(str))
}


