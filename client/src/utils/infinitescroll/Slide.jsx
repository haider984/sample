import React from "react";
import "./Slider.scss";
import Slider from "infinite-react-carousel";
import CatCards from "../CategoriesCards/CatCards";
import { cards } from "../../data";

function Slide({childern,slidesToShow,arrowScroll}) {
  return (

    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowScroll={arrowScroll} >
          {cards.map(card=>(<CatCards item={card} key={card.id}/>))}
        </Slider>
      </div>
     
    </div>
  );
}

export default Slide;
