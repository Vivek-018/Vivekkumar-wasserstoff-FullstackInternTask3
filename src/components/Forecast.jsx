import React from "react";
import "./Forecast.css";

// Forecast component to display daily weather forecast data
const Forecast = ({ forecastData, unit }) => {
  // Determine the appropriate unit symbol based on the unit type
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  // Function to extract one forecast entry per day from the provided list
  const getDailyForecast = (list) => {
    const dailyData = [];
    const seenDates = new Set(); // Set to track dates already processed

    // Loop through each entry in the forecast list
    list.forEach((entry) => {
      const date = new Date(entry.dt_txt).toLocaleDateString(); // Extract date in a readable format

      // If the date has not been seen before, add the entry to dailyData
      if (!seenDates.has(date)) {
        dailyData.push(entry);
        seenDates.add(date); // Mark the date as seen
      }
    });

    return dailyData; // Return the list of daily forecast data
  };

  // Get the daily forecast by processing the forecast data list
  const dailyForecast = getDailyForecast(forecastData.list);

  return (
    <div className="forecast-container">
      {/* Render each day's forecast data */}
      {dailyForecast.map((day, index) => (
        <div key={index} className="forecast-day">
          {/* Display the date of the forecast */}
          <h3 className="forecast-date">
            {new Date(day.dt_txt).toLocaleDateString()}
          </h3>
          {/* Display the weather icon */}
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          {/* Display the temperature with the appropriate unit symbol */}
          <p className="forecast-temp">
            {day.main.temp.toFixed(1)}
            {unitSymbol}
          </p>
          {/* Display the weather description */}
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
