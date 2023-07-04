const express =  require('express');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const {JSDOM} = require("jsdom");
const app = express();
const html=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nabla&display=swap" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <center>
        <h1>Weather Indicator</h1>
        <form action="/" method="post">
            <div name = "div1" class="search-box">
                <input type="text" name = "cityName" class="cityName" placeholder ="Enter City Name">
                <button class="btn">
                    <span >
                        <img class="inner-btn-text" src="images/icons8-magnifying-glass-90.png">
                    </span>
                </button>
            </div>
        </form>
    </center>
    <center>
        <div class="temp-box">
            <img class="temp-img" id="temp-img" src="images/thunderstormicon.gif"><br>
            <center>
                <span id="temp-text" class="temp-text">
                    . . .
                </span>
            </center>
            <center>
                <span id="temp-desc" class="temp-desc">
                    . . .
                </span>
            </center>
            <center>
                <span id="temp-desc2" class="temp-desc2">
                    . . .
                </span>
            </center>
        </div>
    </center>
    <div class="weather-box">
        <div class="wind">
            <center>
            <img class="wind-icon" src="images/windsock.png"><br>
            </center>
            <span name="wind-text" class="wind-text">Wind Speed</span><br>
            <center>            
                <span class="wind-text1" id="wind-text1">. . .</span>
            </center>    
            </div>
        <div class="location">
            <center>
            <img class="location-icon" src="images/pin.png"><br>
            </center>
            <span name="location-text" class="location-text">Location</span><br>
            <center>            
                <span class="location-text1" id="location-text1">. . .</span>
            </center>    
            </div>
        <div class="humidity">
            <center>
            <img class="humidity-icon" src="images/humidity (1).png"><br>
            </center>
            <span name="humidity-text" class="humidity-text">Humidity</span><br>
            <center>            
                <span class="humidity-text1" id="humidity-text1">. . .</span>
            </center> 
        </div>
    </div>
    <footer class="footer">
        © Weather Indicator
    </footer>
    <script src="app.js"></script>
    
</body>

</html>`
const dom = new JSDOM(html);
const document = dom.window.document;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.post("/",function(req,res){
    var city = req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7506b0f5e76dd472e590bb505a9a7360&units=metric";

    https.get(url,function(response){
        const status = response.statusCode;
        if(status == 404){
            res.sendFile(__dirname+'/404.html');
        }else{
            response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const cityname =weatherData.name;
            const temp =weatherData.main.temp;
            const desc = weatherData.weather[0].main;
            const humidity =weatherData.main.humidity;
            const windspeed = weatherData.wind.speed;
            const temp_desc = weatherData.weather[0].description;
            const text = document.getElementById("temp-text");
            text.innerHTML = temp+" °C";
            const desc2 = document.getElementById("temp-desc");
            desc2.innerHTML = desc;
            const desc3 = document.getElementById("temp-desc2");
            desc3.innerHTML = temp_desc;
            const hum = document.getElementById("humidity-text1");
            hum.innerHTML = humidity+" %";
            const wind = document.getElementById("wind-text1");
            wind.innerHTML = windspeed+" km/hr";
            const city = document.getElementById("location-text1");
            city.innerHTML = cityname;
            const icon = document.querySelector("#temp-img");
            if(desc == "Thunderstorm"){
                icon.src="images/thunder.gif";
            }else if(desc == "Drizzle"){
                icon.src="images/11_rain.gif";
            }else if(desc == "Rain"){
                icon.src="images/11_rain.gif";
            }else if(desc == "Snow"){
                icon.src="images/13_snow.gif";
            }else if(desc == "Mist"){
                icon.src="images/waves.gif";
            }else if(desc == "Smoke"){
                icon.src="images/waves.gif";
            }else if(desc == "Haze"){
                icon.src="images/waves.gif";
            }else if(desc == "Dust"){
                icon.src="images/waves.gif";
            }else if(desc == "Fog"){
                icon.src="images/waves.gif";
            }else if(desc == "Sand"){
                icon.src="images/waves.gif";
            }else if(desc == "Ash"){
                icon.src="images/waves.gif";
            }else if(desc == "Squall"){
                icon.src="images/waves.gif";
            }else if(desc == "Tornado"){
                icon.src="images/tornado.gif";
            }else if(desc == "Clear"){
                icon.src="images/sun-icon-animation.gif";
            }else if(desc == "Clouds"){
                icon.src="images/cloudy2.gif";
            }
            
            const updatedHTML = dom.serialize();

            
            res.send(updatedHTML);
        });
        }
    });
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server started");
})
