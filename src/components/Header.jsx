import React from "react";
import SearchBar from "./SearchBar";
import UnitToggle from "./UnitToggle";
import "./Header.css";

const Header = ({ onSearch, unit, onUnitToggle, weatherData }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Weather Forecast Dashboard</h1>
        <div className="header-controls">
          <SearchBar onSearch={onSearch} />
          {weatherData && (
            <UnitToggle unit={unit} onToggle={onUnitToggle} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
