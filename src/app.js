const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'..//templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        creator: 'Made by Panos'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        creator: 'Made by Panos'

    })
})

app.get('/weather', (req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: "u must provide an address"
        })
    }



    //zxczxcz
    geocode(req.query.address, (error,{latitude,longitude,location}= {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

     })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        phone: '6999999999',
        title: 'Help',
        creator: 'Made by Panos'

    })
})

//here is were the json data will be stored
app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'U must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Panos',
        errorMessage: 'Page not found.'

    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Panos',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})