"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from "react";
import Weather from "../components/Weather";
import FiveDays from "../components/FiveDays";
import SunriseSunset from "../components/SunriseSunset";
import WindSpeed from "../components/WindSpeed";
import HourlyWeather from "../components/HourlyWeather";
import FeelsLike from "../components/FeelsLike";
import HumidityInfo from "../components/HumidityInfo";
import VisibilityInfo from "../components/VisibilityInfo";
import PressureInfo from "../components/PressureInfo";
import RainInfo from "../components/RainInfo";


export default function Dashboard() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperatureData] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  const fetchWeatherData = async () => {
    const apiKey = '18b48be778973a8963158ef8313293cc';
    const commonUrl = 'https://api.openweathermap.org/data/2.5';
    const weatherUrl = `${commonUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `${commonUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const [weatherResponse, forecastResponse, hourlyResponse] =
        await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl),
          fetch(forecastUrl), 
        ]);

     
      if (weatherResponse.ok && forecastResponse.ok && hourlyResponse.ok) {
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastData = await forecastResponse.json();
        
        setForecastData(forecastData.list.slice(0, 5 * 8));  

        const hourlyData = await hourlyResponse.json();
        
        const hourlyTemperatureData = hourlyData.list.map((hourlyEntry) => ({
          time: hourlyEntry.dt,
          temperature: hourlyEntry.main.temp,
        }));
        setHourlyTemperatureData(hourlyTemperatureData);

        
        setErrorAlert(null);
      } else {
        
        setErrorAlert("Invalid city name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    
      setErrorAlert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <main className="text-center flex-1 w-full">
        <h1 className="text-4xl font-bold mb-8 mt-4">
          Welcome to the Weather App!
        </h1>

        
        <div className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Enter city name"
            className="p-4 mr-4 bg-gray-700 text-white rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="p-4 bg-blue-500 text-white rounded cursor-pointer"
            onClick={fetchWeatherData}
          >
            Search
          </button>
        </div>

      
        {errorAlert && <div className="text-red-500 mb-4">{errorAlert}</div>}

       
        {currentWeather && forecastData && hourlyTemperatureData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Weather currentWeather={currentWeather} />
            </div>
            <div className="md:col-span-1">
              <SunriseSunset
                sunrise={currentWeather.sys.sunrise}
                sunset={currentWeather.sys.sunset}
              />
              <WindSpeed windSpeed={currentWeather.wind.speed} />
            </div>
            <div className="md:col-span-2">
              <HourlyWeather hourlyTemperatureData={hourlyTemperatureData} />
            </div>
            <div className="md:col-span-1">
              <FeelsLike
                actualTemperature={currentWeather.main.temp}
                feelsLikeTemperature={currentWeather.main.feels_like}
              />
              <HumidityInfo humidity={currentWeather.main.humidity} />
              <VisibilityInfo visibility={currentWeather.visibility} />
            </div>
            <div className="md:col-span-2">
              <FiveDays forecastData={forecastData} />
            </div>
            <div className="md:col-span-1">
              <PressureInfo pressure={currentWeather.main.pressure} />
              <RainInfo rainVolume={currentWeather.rain?.["1h"] || 0} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}