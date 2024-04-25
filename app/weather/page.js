"use client";
import { useRouter } from 'next/router';
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


export default function Home() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyTemperatureData, setHourlyTemperatureData] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  const fetchWeatherData = async () => {
    // const apiKey = '4413bf0af2msh933218eea5ebc8cp15d4c6jsnd4163a4ac681';
    // const commonUrl = https://meteostat.p.rapidapi.com/stations/hourly?station=10637&start=2020-01-01&end=2020-01-01&tz=Europe%2FBerlin';
    const weatherUrl = `${commonUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `${commonUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const [weatherResponse, forecastResponse, hourlyResponse] =
        await Promise.all([
          fetch(weatherUrl),
          fetch(forecastUrl),
          fetch(forecastUrl), 
        ]);

      // Check if all responses are OK
      if (weatherResponse.ok && forecastResponse.ok && hourlyResponse.ok) {
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastData = await forecastResponse.json();
        // Extracting only the next 5 days' data
        setForecastData(forecastData.list.slice(0, 5 * 8));  

        const hourlyData = await hourlyResponse.json();
        // Extract hourly temperature data
        const hourlyTemperatureData = hourlyData.list.map((hourlyEntry) => ({
          time: hourlyEntry.dt,
          temperature: hourlyEntry.main.temp,
        }));
        setHourlyTemperatureData(hourlyTemperatureData);

        // Clear any previous error alert
        setErrorAlert(null);
      } else {
        // Show alert for incorrect city name
        setErrorAlert("Invalid city name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Show alert for general error
      setErrorAlert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <main className="text-center flex-1 w-full">
        <h1 className="text-4xl font-bold mb-8 mt-4">
          Welcome to the Weather App!
        </h1>

        {/* Search option with input on the left and button on the right */}
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

        {/* Show error alert if applicable */}
        {errorAlert && <div className="text-red-500 mb-4">{errorAlert}</div>}

        {/* Additional Information Cards */}
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