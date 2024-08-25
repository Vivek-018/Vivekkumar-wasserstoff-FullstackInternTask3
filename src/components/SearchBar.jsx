import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

// SearchBar component allows users to input a city name and trigger a search
const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  // Load the previously searched city from sessionStorage when the component mounts
  useEffect(() => {
    const savedCity = sessionStorage.getItem("cityName");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input field is not empty
    if (city.trim()) {
      onSearch(city); // Trigger the search with the entered city name
      sessionStorage.setItem("cityName", city); // Save the city name in sessionStorage
    } else {
      alert("Please enter the city name:"); // Alert the user if the input field is empty
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        {/* Input field for entering the city name */}
        <input
          className="search-input"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* Search button with a search icon */}
        <button className="search-button" type="submit">
          <FaSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
