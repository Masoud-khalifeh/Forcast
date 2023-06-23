import react, { useState, useEffect } from 'react';
import Search from './Search';
import axios from 'axios';
import {v4 as uuid} from 'uuid';


export default function Forcast() {
    const API_key = "3363631a32d2773b5ce7af823700ea05";
    const [city, setCity] = useState("");
    const [latLong, setLatLong] = useState("");
    const [forcastDetail, setForcastDetail] = useState("");
    const [firstRequest, setFirstRequest] = useState(false);
    const [fiveDays, setFiveDays] = useState("")

    function AddCity(city) {
        setCity(city)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_key}`);
                setLatLong(response.data)
            } catch (error) {
                console.log(error)
            }
            setFirstRequest(true)

        };
        if (city) {
            fetchData()
        }

    }, [city])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=${API_key}`);
                setForcastDetail(response.data);

            } catch (error) {
                console.log(error);
                setForcastDetail("");

            }


        }
        if (latLong) {
            fetchData()
        }
    }, [latLong])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latLong[0].lat}&lon=${latLong[0].lon}&units=metric&appid=${API_key}`);
                setFiveDays(response.data)
            } catch (error) {
                console.log(error)
            }

        };
        if (city) {
            fetchData()
        }

    }, [latLong])

    return (
        <div>
            <Search Add={AddCity} />
            {firstRequest ? (
                latLong[0] && forcastDetail.main&&fiveDays.list ?
                    <div>
                        <div>
                            <p>City Name : {latLong[0].name} </p>
                            <p>Temperature : {forcastDetail.main.temp} Celsius (°C) </p>
                            <p>Weather description : {forcastDetail.weather[0].description} </p>
                            <p>Humidity : {forcastDetail.main.humidity} Percentage (%)</p>
                            <p>Wind speed : {forcastDetail.wind.speed}  Meters per second (m/s)</p>
                        </div>
                        <div>
                            <h2>Forcast 5 days</h2>
                        </div>
                        {fiveDays.list.map(day => (
                            <div key={uuid()}>
                                <p>date : {day.dt_txt} </p>
                                <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}/>
                                <p>temperature : {day.main.temp} Celsius (°C) </p>
                                <p>weather description : {day.weather[0].description} </p>
                            </div>
                        ))}

                    </div>
                    :
                    <div>I could not find the city</div>
            )
                : null}













        </div>
    )
}