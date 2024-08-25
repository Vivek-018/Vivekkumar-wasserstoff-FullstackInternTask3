import React from "react";
import "./UnitToggle.css";

// UnitToggle component allows users to switch between Celsius (°C) and Fahrenheit (°F)
const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle">
      {/* Button to switch to Celsius; it is highlighted when Celsius is the active unit */}
      <button
        className={unit === "metric" ? "active" : ""}
        onClick={() => onToggle("metric")}
      >
        °C
      </button>
      {/* Button to switch to Fahrenheit; it is highlighted when Fahrenheit is the active unit */}
      <button
        className={unit === "imperial" ? "active" : ""}
        onClick={() => onToggle("imperial")}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
