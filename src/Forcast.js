import react, { useState, useEffect } from 'react';
import Search from './Search';
import axios from 'axios';


export default function Forcast() {
    const [city, setCity] = useState("");
    const [latLong, setLatLong] = useState("");
    const [forcastDetail, setForcastDetail] = useState("");

    function AddCity(city) {
        setCity(city)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3363631a32d2773b5ce7af823700ea05`);
                setLatLong(response.data)
            } catch (error) {
                console.log(error)
            }

        };
        if (city) {
            fetchData()
        }

    }, [city])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=3363631a32d2773b5ce7af823700ea05`);
                setForcastDetail(response.data)
            } catch (error) {
                console.log(error)
            }


        }
        if (latLong) {
            fetchData()
        }
    }, [latLong])

    return (
        <div>
            <Search Add={AddCity} />
            <div>
            <p>City Name : {latLong[0].name} </p>
            <p>Temperature : {forcastDetail.main.temp} Celsius (°C) </p>
            <p>Weather description : {forcastDetail.weather[0].description} </p>
            <p>Humidity : {forcastDetail.main.humidity} Percentage (%)</p>
            <p>Wind speed : {forcastDetail.wind.speed}  Meters per second (m/s)</p>
            </div>
        </div>
    )
}