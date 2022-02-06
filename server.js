const express = require('express')
const app = express()
const port = 3010

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('Home Page')
    res.render('index', { text: "World" })
})

app.listen(port)


const db = require('./db')
const connection = db.connection

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields){
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)

})

