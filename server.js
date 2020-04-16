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
const data = fs.readFileSync('guitars.json');
let guitars = JSON.parse(data)
console.log(guitars);

function updateFile() {
    
    fs.writeFile('guitars.json', JSON.stringify(guitars), update);
    function update(err) {
        if(err) {
            console.log('Something went wrong')
        }
        console.log('File updated')
    }
}



// All routes
// Get 
// All guitas
app.get('/guitars', (req, res) => {
    res.json(guitars);
});

// One guitar
app.get('/guitars/:guitarId', (req, res) => {
    const foundGuitar = guitars.find((guitar) => {
        if (guitar.id.toString() === req.params.guitarId) {
            return true;
        } else {
            return false;
        }
    })

    if (!foundGuitar) {
        res.status(404).send();
    } else {
        res.send(foundGuitar);
    }
});


// Post
// Add guitar add
app.post('/guitars', (req, res) => {
    const guitar = {
        id: req.body.id,
        name: req.body.name,
        color: req.body.color
    };

    if (!guitar) {
        res.status(404).send();
    } else {
        guitars.push(guitar);
        res.status(201).send(guitar);
        updateFile()
    }
})

// Put
// Update guitar
app.put('/guitars/:guitarId', (req, res) => {
    const foundGuitar = guitars.find((guitar) => {
        if (guitar.id.toString() === req.params.guitarId) {
            return true;
        } else {
            return false;
        }
    })
    if (!foundGuitar) {
        res.status(404).send();
    } else {
        foundGuitar.name = req.body.name
        foundGuitar.color = req.body.color
        res.send(foundGuitar)
        updateFile()
    }
})

// Delete
// Delete guitar
app.delete('/guitars/delete/:guitarId', (req, res) => {
    const foundGuitar = guitars.find((guitar) => {
        if (guitar.id.toString() === req.params.guitarId) {
            return true;
        } else {
            return false;
        }
    })
    if (!foundGuitar) {
        res.status(404).send();
    } else {
        const index = guitars.indexOf(foundGuitar)
        guitars.splice(index, 1)
        res.send(foundGuitar)
        updateFile()
    }
})











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


