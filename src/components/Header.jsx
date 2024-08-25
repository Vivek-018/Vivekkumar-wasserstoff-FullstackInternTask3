import React from "react";
import SearchBar from "./SearchBar";
import UnitToggle from "./UnitToggle";
import "./Header.css";

// Header component that displays the title, search bar, and unit toggle controls
const Header = ({ onSearch, unit, onUnitToggle, weatherData }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Title of the dashboard */}
        <h1 className="header-title">Weather Forecast Dashboard</h1>
        <div className="header-controls">
          {/* Search bar for user to input city names */}
          <SearchBar onSearch={onSearch} />
          {/* Unit toggle control is displayed only when weather data is available */}
          {weatherData && (
            <UnitToggle unit={unit} onToggle={onUnitToggle} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

