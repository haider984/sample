// Import required React libraries and the associated styles
import React from "react";
import "./countdown.scss";

// Define the CountDownSquare functional component
const CountDownSquare = ({ label, number, cardRef }) => {
  return (
    // The main container for each countdown card (like days, hours, minutes, etc.)
    <div className="countdown__card">
      <div className="countdown__card__bg" ref={cardRef}>
        <div className="countdown__card__number" id={label}>
          {number}
        </div>
      </div>
      <div className="countdown__card__label">{label}</div>
    </div>
  );
};

// Export the CountDownSquare component for use in other parts of the app
export default CountDownSquare;
