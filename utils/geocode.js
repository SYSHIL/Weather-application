const request = require('postman-request')

const geocode = (address,callback) => {

    const geocodingurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3lzaGlsIiwiYSI6ImNsNnRwcjI2NDE1YWQzY3BidjV4MTNuaHEifQ.OgwrBrSYc0gzXH-vUxtBfg'
    request({url:geocodingurl,json:true},(error,response)=>{
    if(error){
        callback("Unable to connect to location service",undefined)
    }
    else if(response.body.features.length === 0){
        callback("Unable to find location.Try another",undefined)
    }
    else{
        callback(undefined,{
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location : response.body.features[0].place_name
        })
    }
    
})

}
module.exports = geocode