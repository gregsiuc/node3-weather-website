const request = require('request')

const getForecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=994ab741fafaee1b4e5741339f710637&query=' + encodeURIComponent(longitude) + ', ' + encodeURIComponent(latitude) + '&units=f'


    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to data service')
        } else if (body.error) {
            callback('unable to find location with those coordinates')
        }


        else {

            callback(undefined, body)
        }


    })
}

module.exports = getForecast