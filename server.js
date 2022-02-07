const express = require('express')
const app = express()
const port = 3010

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('Home Page')
    res.render('index', { text: "World" })
})

app.listen(port)


const { PrismaClient } =  require('@prisma/client')
const prisma = new PrismaClient()

