import axios from "axios";

const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchData = async(query) => {

    const {data} = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
    let lat = data[0].lat
    let lng = data[0].lon;


    const waetherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    
    //console.log(waetherData.data);

    return waetherData.data
}