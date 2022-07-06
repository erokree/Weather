const express = require("express")
const app = express()
const port = 3001
const https = require('https')
const bodyParser = require("body-parser")
//initialising body parser
app.use(bodyParser.urlencoded({extended:true}))

//sending html file for its form response
app.get('/',(req,res)=>{
   res.sendFile(__dirname + "/index.html")
})

app.post('/',(req,res)=>{
    //console.log(req.body.city);
    //req.body is used for using data from the form
    const cityName = (req.body.city)
    const key = ("eeaa9699e16c47bcb76104957222002")
    const url = ('https://api.weatherapi.com/v1/current.json?key='+key+'&q='+cityName+'&aqi=no')
https.get(url,response=>{
    console.log(response.statusCode)

    response.on('data', data=>{
        var weatherData = (JSON.parse(data))
        
        console.log(weatherData.current.temp_c)
        console.log(weatherData.location.name)

        var icons = (weatherData.current.condition.icon)
        console.log(icons)

        var imgUrl= ("https:" + icons)

        res.set("Content-Type", "text/html")
        // res.write("mausam hai suhana aaj pakode hai khaana")
        res.write("<h1>the temprature in "+ weatherData.location.name+ " is "+ weatherData.current.temp_c +"°C.</h1>")
        res.write("<img src="+imgUrl+" alt='weatherImage'></img>")
        res.send()
    })
      
})
// there can be only one res.send in any app.get meathod but multiple res.write
// res.send("server is up and live")
})



app.listen(port,()=>{
    console.log("we are live")
})