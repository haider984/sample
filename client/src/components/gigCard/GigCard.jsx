// Importing necessary React libraries, styles, and hooks
import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

// GigCard component
const GigCard = ({ item }) => {
  // Using react-query to fetch data for the user associated with a gig
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  // JSX for rendering the GigCard component
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        {/* Display gig cover image */}
        <img src={item.cover} alt="" />
        <div className="info">
          {/* Conditional rendering based on data fetching status */}
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              {/* Display user's avatar (or a default avatar) and username */}
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          {/* Display a short description of the gig */}
          <p>{item.shortDesc}</p>
          <div className="star">
            {/* Display star rating */}
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          {/* Display favorite icon */}
          <img src="./img/heart.png" alt="" />
          <div className="price">
            {/* Display gig price */}
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Export the GigCard component for use in other parts of the app
export default GigCard;
