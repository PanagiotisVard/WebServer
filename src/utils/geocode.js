const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=country&access_token=pk.eyJ1IjoiZWx2YXJkdXMiLCJhIjoiY2xqb2QzOWplMDc3ZTNmcGI5dWs3bHphMSJ9.6Ob3W8NvC3SXu1Cj0rUIeg&limit=1'

    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to location services! I am in geocode',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location! Try another search.',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


//exporting the function
module.exports = geocode