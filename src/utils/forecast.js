const request = require('postman-request')

const forecast = ((lat,long,callback) =>{
    const weatherurl = 'http://api.weatherstack.com/current?access_key=518f25bb36ef12a4868cbd7f9cbd7acf&query='+lat+','+ long +'&units=m'
    request({url:weatherurl,json:true},(error,{body})=>{
    if(error){
        callback("Unable to connect to weather service",undefined)
    }
    else if(body.error){
        callback("Unable to fetch weather data",undefined)
    }
    else{
        current_weather = body.current
        callback(undefined,{
            description : current_weather.weather_descriptions[0],
            temperature : current_weather.temperature
        })
    }
    
})

})
module.exports = forecast