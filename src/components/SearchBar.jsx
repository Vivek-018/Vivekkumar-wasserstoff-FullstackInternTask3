import React, { useState , useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

 
  useEffect(() => {
    const savedCity = sessionStorage.getItem("cityName");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      sessionStorage.setItem("cityName", city);
    } else {
      alert("Please enter the city name:");
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" type="submit">
          <FaSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
