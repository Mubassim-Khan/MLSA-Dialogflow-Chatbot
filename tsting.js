const express = require("express");
const path = require("path");
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname, 'index.html')
    // res.send("This is about section")
})
app.listen(port,  () => {
    console.log(`App is listening at http://localhost:${port}`)
})