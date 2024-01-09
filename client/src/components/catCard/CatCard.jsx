// Import required libraries
import React from "react";
import { Link } from "react-router-dom";

// Importing stylesheet for the CatCard component
import "./CatCard.scss";

/**
 * CatCard Component: A clickable card that redirects to a specific category's gigs page
 * 
 *  card - Contains information to be displayed on the card
 *  card.img - Image URL for the category
 *  card.desc - Short description or tagline for the category
 *  card.title - Title or name of the category
 * 
 */
function CatCard({ card }) {
  return (
    // Link to navigate to gigs page filtered by the 'design' category
    <Link to="/gigs?cat=design">
      {/* Main container for the category card */}
      <div className="catCard">
        {/* Category image */}
        <img src={card.img} alt={card.title} /> {/* Improved alt attribute for accessibility */}
        
        {/* Short description or tagline for the category */}
        <span className="desc">{card.desc}</span>
        
        {/* Category title */}
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}

// Export CatCard component for use in other parts of the app
export default CatCard;
