interface Weather {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
  }
  
  interface City {
    name: string;
    country: string;
    timezone: string;
  }
  
  interface WeatherApiResponse {
    weather: Weather;
  }
  
  interface CityApiResponse {
    cities: City[];
  }
  