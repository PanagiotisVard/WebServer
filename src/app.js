const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
    res.send([{
        forecast: 'tha gamithei na vrexei'},
        {location: 'Londino elladas'}]
    )
})

app.get('/help', (req, res)=>{
    res.render('help',{
        phone: '6999999999',
        title: 'Help',
        creator: 'Made by Panos'

    })
})

app.get('*',(req,res)=>{
    res.send('Error 404 page')
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})