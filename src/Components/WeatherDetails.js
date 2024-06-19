import React, { useState, useEffect, useCallback } from 'react';
import './WeatherDetails.css';
import search from '../Images/search-icon-png-9969.png';
import cloudicon from '../Images/cloudsIcon.png';
import drizzle from '../Images/drizzle.webp';
import rain from '../Images/rain.png';
import winde from '../Images/wind.webp';
import humiditi from '../Images/humidity.png';
import sunlight from '../Images/sunLight.webp';

const WeatherDetails = () => {
    const apikey = "9c178b4d46226034bfe7ed071b5529e7";
    const [text, setText] = useState("chennai");
    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("chennai");
    const [country, setCountry] = useState("India");
    const [lat, setLat] = useState(0);
    const [log, setLog] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setwind] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searched = useCallback(async () => {
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}`;
        try {
            setLoading(true);
            const res = await fetch(apiurl);
            const data = await res.json();
            console.log(data);
            if (data.cod === "404") {
                setError("City not found.");
                setLoading(false);
                return;
            }
            console.log(data.weather[0].main);
            setHumidity(data.main.humidity);
            setTemp(Math.floor(data.main.temp));
            setwind(data.wind.speed);
            setCity(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLog(data.coord.lon);
            setError("");
            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setIcon(sunlight);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setIcon(cloudicon);
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setIcon(drizzle);
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setIcon(drizzle);
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setIcon(rain);
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setIcon(rain);
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setIcon(rain);
            }
            else {
                setIcon(rain);
            }
        }
        catch (error) {
            console.error("An error occurred", error.message);
            setError("Failed to fetch data.");
        }
        finally {
            setLoading(false);
        }
    }, [text, apikey]);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searched();
        }
    }

    useEffect(() => {
        searched();
    }, [searched]);

    return (
        <>
            <div className="container">
                <div className="input-container">
                    <input type="text" className='cityInput' placeholder="cityname" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <div className='SearchIcon'>
                        <img src={search} onClick={() => { searched(); }} alt="search" />
                    </div>
                </div>
                <div className='image'>
                    <img src={icon} alt="mage" />
                </div>
                <div className="temperature"> Temperature :{temp}C  </div>
                <div className="city"> Location :{city} </div>
                <div className="countryName">Country: {country}</div>
                <div className="cord">
                    <div>
                        <span className="lat">Latitude :</span>
                        <span>{lat}</span>
                    </div>
                    <div>
                        <span className="log">Longitude :</span>
                        <span>{log}</span>
                    </div>
                </div>
                <div className="data-container">
                    <div className="element">
                        <img src={humiditi} alt="ji" className="humidity" />
                        <div className="data">
                            <div className="humidity-percent">{humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={winde} alt="" className="humidity" />
                        <div className="data">
                            <div className="wind-speed">{wind} km/h</div>
                            <div className="text">Wind</div>
                        </div>
                    </div>
                </div>
                <div className="designed">
                    Designed by <b>karthickkumar c</b>
                </div>
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </>
    )
}

export default WeatherDetails;
