import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
`;

function WeatherPage({ weatherData }) {
    let backgroundStyle = {};
    if (weatherData) {
      const weather = weatherData.weather[0].main.toLowerCase();
      switch (weather) {
        case 'clear':
          backgroundStyle = { backgroundColor: '#ffcc00' };
          break;
        case 'clouds':
          backgroundStyle = { backgroundColor: '#b3c6ff' };
          break;
        case 'rain':
          backgroundStyle = { backgroundImage: 'url("/images/rain.gif")' }; 
          break;
        default:
          backgroundStyle = { backgroundColor: '#fff' }; 
      }
    }
  
    return (
      <WeatherContainer style={backgroundStyle}>
        <h1>Current Weather</h1>
        {weatherData && (
          <div>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </WeatherContainer>
    );
  }  