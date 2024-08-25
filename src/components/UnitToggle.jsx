import React from "react";
import "./UnitToggle.css";

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle">
      <button
        className={unit === "metric" ? "active" : ""}
        onClick={() => onToggle("metric")}
      >
        °C
      </button>
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
