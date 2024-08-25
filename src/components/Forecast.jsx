import React from "react";
import "./Forecast.css";

const Forecast = ({ forecastData, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const getDailyForecast = (list) => {
    const dailyData = [];
    const seenDates = new Set();

    list.forEach((entry) => {
      const date = new Date(entry.dt_txt).toLocaleDateString();

      if (!seenDates.has(date)) {
        dailyData.push(entry);
        seenDates.add(date);
      }
    });

    return dailyData;
  };

  const dailyForecast = getDailyForecast(forecastData.list);

  return (
    <div className="forecast-container">
      {dailyForecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <h3 className="forecast-date">
            {new Date(day.dt_txt).toLocaleDateString()}
          </h3>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p className="forecast-temp">
            {day.main.temp.toFixed(1)}
            {unitSymbol}
          </p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
