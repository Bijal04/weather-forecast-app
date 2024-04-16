import React, { useState, useContext, createContext } from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

const WeatherPage = () => {
  const { weatherData } = useWeather();

  return (
    <div>
      <h1>Weather Page</h1>
      {weatherData && (
        <div>
        </div>
      )}
    </div>
  );
};

export { WeatherProvider, useWeather, WeatherPage };
