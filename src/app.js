const path = require('path')
const express = require('express')
const hbs = require('hbs',)
const geoCode = require('./utils/geocode')
const getForecast = require('./utils/forecast')
const e = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Greg Schloemann"
    })
})


app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me', name: "Greg schloemann" })
})

app.get('/help', (req, res) =>
    res.render('help', { title: 'Help Page', message: "this is your technical support message", name: "Greg Schloemann" }))

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "address is required" })
    }

    geoCode(req.query.address, (error, { longitude, latitude, searchLocation } = {}) => {
        if (error) {
            return res.send({
                error: "Yo bro shit went wrong I couldn't fetch deets on that location because the service is down"
            })
        }

        else {
            getForecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error: "Yo Bro no forecast was available" })
                }

                else {
                    res.send({
                        forecast: forecastData,
                        searchLocation,
                        address: req.query.address
                    })
                }
            })
        }
    })



})

// geoCode(req.query.address, (error, data) => {
//     if (error) {
//         console.log(error)
//     } else {


//         getForecast(data.longitude, data.latitude, (error, forecastData) => {
//             if (error) {
//                 console.log('There was an error processing your request:', error)
//             } else if (data.length === 0) {
//                 console.log('No Information for that location')
//             } else {
//                 res.send(
//                     {
//                         location: forecastData.location.name,
//                         forecast: forecastData.current.weather_descriptions,
//                         temperature: forecastData.current.temperature,
//                         windDirection: forecastData.current.wind_dir,
//                         windSpeed: forecastData.current.wind_speed
//                     })
//             }
//         })
//     }
// })







app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Error', { name: 'Greg Schloemann', title: '404 Error', errorTitle: "Help Page Not Found", errorMessage: "Could not find the help page please try again" })

})

app.get('*', (req, res) => {
    res.render('404Error', { name: 'Greg Schloemann', title: '404 Error', errorTitle: 'Page Not Found On Site', errorMessage: "Could not find the page you are looking for please try again" })

})

app.listen(3000, () => {
    console.log('Server is running...')
})