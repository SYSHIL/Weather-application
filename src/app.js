const express = require('express')
const path = require('node:path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
// define paths for express config
const dir = __dirname
const publicDirectoryPath = path.join(dir,'../public')
const viewsPath = path.join(dir,'../templates/views')
const partialsPath = path.join(dir,'../templates/partials')
// app variable stores our express application
const app = express()

//set up handlebars enginer, views location and partials location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//set up static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'ilhan'})
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

   // req.query.address is our location
   // use location to geocode
   // use geocoded coordinates to get forecast
   // sned back real forecast and locaiton via callback
   location = req.query.address
   geocode(location,(error,{location,latitude,longitude}={})=>{ 
    if(error){
        res.send({errorMessage:error})

    } 
    else{
    
        forecast(latitude,longitude, (error, {description,temperature}) => {
            if(error){
                res.send({errorMessage:error})
            }
            else{
                res.send({location:location,description:description,temperature:temperature})
   
            }
        })

    }
})
})

app.get('/about',(red,res)=>{
    res.render('about',{title:'About me',name:'ilhan'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'ilhan',helpMessage:'Feeling stuck? We\'re here for you'})
})
app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }
  
})
app.get('/help/*',(req,res)=>{
    res.render('404',{title:'Help',errorMessage:'Help article not found',name:'ilhan'})
})
app.get('*',(req,res)=>{
    res.render('404',{title:'Not found',errorMessage:'page not found',name:'ilhan'})
})

app.listen(3000,()=>{
    console.log('Server is listening')
})
