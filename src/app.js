const path = require('path')
const express = require('express')


const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Panos'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Panos'
    })
})

app.get('/weather', (req, res)=>{
    res.send([{
        forecast: 'tha gamithei na vrexei'},
        {location: 'Londino elladas'}]
    )
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})