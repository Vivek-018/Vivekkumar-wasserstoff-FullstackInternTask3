import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import { FaExclamationCircle } from "react-icons/fa";

import { fetchWeatherData, fetchForecastData } from "./services/weatherService";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const savedCity = sessionStorage.getItem("city");
    const savedWeatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    const savedForecastData = JSON.parse(
      sessionStorage.getItem("forecastData")
    );
    const savedUnit = sessionStorage.getItem("unit");

    if (savedCity && savedWeatherData && savedForecastData && savedUnit) {
      setWeatherData(savedWeatherData);
      setForecastData(savedForecastData);
      setUnit(savedUnit);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const weather = await fetchWeatherData(city, unit);
      const forecast = await fetchForecastData(city, unit);

      sessionStorage.setItem("city", city);
      sessionStorage.setItem("weatherData", JSON.stringify(weather));
      sessionStorage.setItem("forecastData", JSON.stringify(forecast));
      sessionStorage.setItem("unit", unit);

      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = async (newUnit) => {
    setUnit(newUnit);
    if (weatherData) {
      setLoading(true);
      try {
        const weather = await fetchWeatherData(weatherData.name, newUnit);
        const forecast = await fetchForecastData(weatherData.name, newUnit);

        sessionStorage.setItem("weatherData", JSON.stringify(weather));
        sessionStorage.setItem("forecastData", JSON.stringify(forecast));
        sessionStorage.setItem("unit", newUnit);

        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Header
        onSearch={handleSearch}
        unit={unit}
        onUnitToggle={handleUnitToggle}
        weatherData={weatherData}
      />
      <main className="main-content">
        {!weatherData ? (
          <div className="welcome-container">
            <h1>Welcome!</h1>
            <p>Enter a city name to get started.</p>
          </div>
        ) : (
          <>
            <section className="weather-section">
              <WeatherCard weatherData={weatherData} unit={unit} />
            </section>
            {forecastData && (
              <section className="forecast-section">
                <Forecast forecastData={forecastData} unit={unit} />
              </section>
            )}
          </>
        )}
        {error && (
          <div className="error-popup">
            <FaExclamationCircle className="error-icon" />
            Error: {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
