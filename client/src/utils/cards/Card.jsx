import React from 'react';
//import './card.scss';

const Card = ({ title, description, iconLink }) => {
  return (
    <div className="card">
      <div className="card-header">
        <img className="card-icon" src={iconLink} alt="Card Icon" />
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-body">
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
