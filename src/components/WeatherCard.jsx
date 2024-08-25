import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="weather-card">
      <h2>{weatherData.name}</h2>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].description}
      />
      <p className="temperature">
        {weatherData.main.temp.toFixed(1)}
        {unitSymbol}
      </p>
      <p className="description">{weatherData.weather[0].description}</p>
      <p className="details">
        Min: {weatherData.main.temp_min.toFixed(1)}
        {unitSymbol} | Max: {weatherData.main.temp_max.toFixed(1)}
        {unitSymbol}
      </p>
      <p className="details">Humidity: {weatherData.main.humidity}%</p>
      <p className="details">
        Wind: {weatherData.wind.speed} m/s {weatherData.wind.deg}°{" "}
      </p>
    </div>
  );
};

export default WeatherCard;

// import React from "react";
// import "./WeatherCard.css";

// const WeatherCard = ({ weatherData, unit }) => {
//   // Return null or a loading state if weatherData is not provided
//   if (!weatherData) {
//     return null;
//   }

//   const unitSymbol = unit === "metric" ? "°C" : "°F";

//   // Check if the weatherData object has the necessary properties
//   if (!weatherData.main || !weatherData.weather || !weatherData.wind) {
//     return <p>Invalid weather data provided.</p>;
//   }

//   return (
//     <div className="weather-card">
//       <h2>{weatherData.name}</h2>
//       {weatherData.weather[0] && (
//         <img
//           className="weather-icon"
//           src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
//           alt={weatherData.weather[0].description}
//         />
//       )}
//       <p className="temperature">
//         {weatherData.main.temp.toFixed(1)}
//         {unitSymbol}
//       </p>
//       {weatherData.weather[0] && (
//         <p className="description">{weatherData.weather[0].description}</p>
//       )}
//       <p className="details">
//         Min: {weatherData.main.temp_min.toFixed(1)}
//         {unitSymbol} | Max: {weatherData.main.temp_max.toFixed(1)}
//         {unitSymbol}
//       </p>
//       <p className="details">Humidity: {weatherData.main.humidity}%</p>
//       <p className="details">
//         Wind: {weatherData.wind.speed} m/s {weatherData.wind.deg}°{" "}
//       </p>
//     </div>
//   );
// };

// export default WeatherCard;
