import axios from "axios";
import authHeader from "./data-service";

// const GET_WEATHER='https://api.openweathermap.org/data/2.5/weather?q=Atyrau&appid=e1a839243acb2aa46a58c818b1c46f91';
const GET_WEATHER='/api/weather/get';



export default {
    getWeather() {
        return axios.get(GET_WEATHER,{ headers: authHeader() })
    },
}