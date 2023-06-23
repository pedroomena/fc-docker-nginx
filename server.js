'use strict';

const express = require('express');
const mysql = require('mysql2');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// DB
const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
})

app.get('/', (req, res) => {
    const { name } = req.query;

    if (name) {
        connection.query(`INSERT INTO people (name) values ('${name}')`)
    
        res.redirect('/')
        return
    }

    connection.query('SELECT name FROM people', (err, rows, fields) => {
        if (err) throw err

        res.send(
            '<h1>Full Cycle Rocks!</h1>' + rows.map(i => `<b>- ${i.name}</b>`).join('<br/>')
        )
    })    
})

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
})
