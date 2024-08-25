import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import { FaExclamationCircle } from "react-icons/fa";

import { fetchWeatherData, fetchForecastData } from "./services/weatherService";
import "./App.css";

// Main application component
const App = () => {
  // State variables to manage weather, forecast data, errors, loading state, and temperature units
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric");

  // useEffect to load saved weather data, forecast data, and unit from sessionStorage on component mount
  useEffect(() => {
    const savedCity = sessionStorage.getItem("city");
    const savedWeatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    const savedForecastData = JSON.parse(
      sessionStorage.getItem("forecastData")
    );
    const savedUnit = sessionStorage.getItem("unit");

    // If saved data exists, set the state with saved values
    if (savedCity && savedWeatherData && savedForecastData && savedUnit) {
      setWeatherData(savedWeatherData);
      setForecastData(savedForecastData);
      setUnit(savedUnit);
    }
  }, []);

  // useEffect to clear error message after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Function to handle city search and fetch weather and forecast data
  const handleSearch = async (city) => {
    setLoading(true); // Start loading state
    try {
      // Fetch weather and forecast data using the city and unit
      const weather = await fetchWeatherData(city, unit);
      const forecast = await fetchForecastData(city, unit);

      // Save data to sessionStorage for persistence
      sessionStorage.setItem("city", city);
      sessionStorage.setItem("weatherData", JSON.stringify(weather));
      sessionStorage.setItem("forecastData", JSON.stringify(forecast));
      sessionStorage.setItem("unit", unit);

      // Update state with fetched data
      setWeatherData(weather);
      setForecastData(forecast);
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle errors by displaying a message and clearing data
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to handle unit toggle between Celsius and Fahrenheit
  const handleUnitToggle = async (newUnit) => {
    setUnit(newUnit); // Update unit state
    if (weatherData) {
      setLoading(true); // Start loading state
      try {
        // Fetch weather and forecast data using the current city and the new unit
        const weather = await fetchWeatherData(weatherData.name, newUnit);
        const forecast = await fetchForecastData(weatherData.name, newUnit);

        // Save updated data to sessionStorage
        sessionStorage.setItem("weatherData", JSON.stringify(weather));
        sessionStorage.setItem("forecastData", JSON.stringify(forecast));
        sessionStorage.setItem("unit", newUnit);

        // Update state with the new data
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        // Handle errors by displaying a message and clearing data
        setError(err.message);
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false); // Stop loading state
      }
    }
  };

  return (
    <div className="container">
      {/* Display loading spinner when data is being fetched */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Header component with search and unit toggle functionality */}
      <Header
        onSearch={handleSearch}
        unit={unit}
        onUnitToggle={handleUnitToggle}
        weatherData={weatherData}
      />

      <main className="main-content">
        {/* Welcome message or weather details based on state */}
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

        {/* Display error message if any */}
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
