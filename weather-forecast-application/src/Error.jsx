import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherPage({ cityName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR_API_KEY`);
        setWeatherData(response.data);
      } catch (error) {
        setError('An error occurred while fetching weather data. Please try again later.');
      }
    };

    fetchWeatherData();
  }, [cityName]);

  return (
    <div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h1>Weather for {cityName}</h1>
x        </div>
      )}
    </div>
  );
}

export default WeatherPage;
