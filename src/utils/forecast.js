const request = require('request')

const forecast = (latitude,longitude , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=aaf579a108efcaaaf1523edb65c32643&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error,{body})=>{

        if(error){
            callback('Unable to connect to location services! I am in Forecast',undefined)
        
        }else if(body.error){
             callback('Unable to find location! Try another search.',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " Celsius out.")
        }

    })
}

//exporting the function
module.exports = forecast
