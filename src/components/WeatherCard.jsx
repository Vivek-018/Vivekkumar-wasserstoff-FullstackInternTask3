import React from "react";
import "./WeatherCard.css";

// WeatherCard component displays the current weather details for a specific location
const WeatherCard = ({ weatherData, unit }) => {
  // Determine the temperature unit symbol based on the selected unit (Celsius or Fahrenheit)
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="weather-card">
      {/* Display the name of the city */}
      <h2>{weatherData.name}</h2>

      {/* Display the weather icon corresponding to the current weather conditions */}
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].description}
      />

      {/* Display the current temperature with the appropriate unit symbol */}
      <p className="temperature">
        {weatherData.main.temp.toFixed(1)}
        {unitSymbol}
      </p>

      {/* Display a brief description of the current weather */}
      <p className="description">{weatherData.weather[0].description}</p>

      {/* Display the minimum and maximum temperatures for the day */}
      <p className="details">
        Min: {weatherData.main.temp_min.toFixed(1)}
        {unitSymbol} | Max: {weatherData.main.temp_max.toFixed(1)}
        {unitSymbol}
      </p>

      {/* Display the humidity level */}
      <p className="details">Humidity: {weatherData.main.humidity}%</p>

      {/* Display the wind speed and direction */}
      <p className="details">
        Wind: {weatherData.wind.speed} m/s {weatherData.wind.deg}°{" "}
      </p>
    </div>
  );
};

export default WeatherCard;
