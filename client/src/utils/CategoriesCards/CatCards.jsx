import React from 'react'
import { Link } from 'react-router-dom';
import './CatCards.scss';
function CatCards(item) {
  return (
    <Link to="/gig?cat=design">
    <div className="CatCards">
        <div className="container">
            <img src={item.item.img} alt="image error"/>
            <span className="desc">{item.item.desc}</span>
            <span className="title">{item.item.title}</span>
        </div>
    </div>
    </Link>
  )
}

export default CatCards