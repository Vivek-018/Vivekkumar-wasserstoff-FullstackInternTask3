import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// fetch weather data by city
export const fetchWeatherData = async (city, unit = "metric") => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error fetching weather data"
    );
  }
};

// error.response.data.message ||

// fetch forecast data

export const fetchForecastData = async (city, unit = "metric") => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error fetching forecast data"
    );
  }
};
// error.response.data.message ||
