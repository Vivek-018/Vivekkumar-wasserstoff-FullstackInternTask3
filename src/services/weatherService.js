import axios from "axios";

// API key for OpenWeatherMap, stored in an environment variable
const API_KEY = import.meta.env.VITE_API_KEY;

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetch current weather data for a specific city.
 * @param {string} city - The name of the city to fetch weather data for.
 * @param {string} [unit="metric"] - The unit of measurement for temperature ("metric" for °C, "imperial" for °F).
 * @returns {Promise<Object>} - A promise that resolves to the weather data object.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchWeatherData = async (city, unit = "metric") => {
  try {
    // Make a GET request to the weather endpoint with the city name, unit, and API key as parameters
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    // Return the weather data from the API response
    return response.data;
  } catch (error) {
    // Throw an error with a custom message if the API request fails
    throw new Error(
      error.response.data.message || "Error fetching weather data"
    );
  }
};

/**
 * Fetch 5-day weather forecast data for a specific city.
 * @param {string} city - The name of the city to fetch forecast data for.
 * @param {string} [unit="metric"] - The unit of measurement for temperature ("metric" for °C, "imperial" for °F).
 * @returns {Promise<Object>} - A promise that resolves to the forecast data object.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const fetchForecastData = async (city, unit = "metric") => {
  try {
    // Make a GET request to the forecast endpoint with the city name, unit, and API key as parameters
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });
    // Return the forecast data from the API response
    return response.data;
  } catch (error) {
    // Throw an error with a custom message if the API request fails
    throw new Error(
      error.response.data.message || "Error fetching forecast data"
    );
  }
};
