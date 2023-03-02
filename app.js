const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const ejs = require('ejs')
const { response } = require('express')
const port = process.env.Port || 3000

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    const location = 'jamshedpur'
    const appid = '9890b1459373d584739fb4b22aa944b9'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + appid + '&units=metric'
    https.get(url, function (response) {
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temperature = Math.floor(weatherData.main.temp)
            res.render('home', { temperature: temperature })
        })
    })
})

app.post('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.ejs')
})

app.listen(port, function () {
    console.log('Server is running on port 3000')
})