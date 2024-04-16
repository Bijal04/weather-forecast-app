import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherPage({ match }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState('metric');
  const cityName = match.params.cityName;
  const apiKey = 'afb4500e2c8331f67054b0943a5a7559';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [cityName, apiKey, units]);

  const handleUnitChange = (selectedUnit) => {
    setUnits(selectedUnit);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather for {cityName}</h1>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp} {units === 'metric' ? '°C' : '°F'}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>
        </div>
      )}
      <div>
        <button onClick={() => handleUnitChange('metric')}>Celsius</button>
        <button onClick={() => handleUnitChange('imperial')}>Fahrenheit</button>
      </div>
      <div>
        <h2>City Location</h2>
        <img
          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
        />
      </div>
    </div>
  );
}

export default WeatherPage;
