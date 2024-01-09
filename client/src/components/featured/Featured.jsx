// Importing necessary React libraries, styles, and hooks
import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  // State to manage the input value for search
  const [input, setInput] = useState("");
  
  // Hook to programmatically navigate the app
  const navigate = useNavigate();

  // Function to handle the search submission
  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);  // Navigate to the search results page with the query
  };

  // JSX for rendering the Featured component
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>Consultant</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => setInput(e.target.value)}  // Update the input state on change
              />
            </div>
            <button onClick={handleSubmit}>Search</button>  
          </div>
          <div className="popular">
            <span>Popular:</span>
            {/* Popular category buttons */}
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

// Export the Featured component for use in other parts of the app
export default Featured;
