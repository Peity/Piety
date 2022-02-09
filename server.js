const { PrismaClient } =  require('@prisma/client')
const express = require('express')
const app = express()
const port = 3010

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log('Home Page')
    res.render('index', { text: "World" })
})

app.use('/', require('./routers/login'))

app.listen(port)



const prisma = new PrismaClient()

exports.prisma = prisma


