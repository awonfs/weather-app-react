import React, { useState } from "react";
import "./App.css";

const App = () => {
  const apiKey = "fe3be0578fd5cacc812f7677a03cd5be";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter a city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p className="welcome">Enter a city to get the weather of.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)} &#176;</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? <p className="error-msg">City not found.</p> : <></>}
    </div>
  );
};

export default App;
