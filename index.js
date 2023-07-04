import axios from 'axios';
export function getcity(cityName){
    return axios.get("https://api.openweathermap.org/data/2.5/weather?appid=7506b0f5e76dd472e590bb505a9a7360&units=metric",{
        params:{
            cityName,
        },
    })
}