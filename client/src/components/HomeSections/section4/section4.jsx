import React from "react";
import { cards } from "../../../data";
import CatCards from "../../../utils/CategoriesCards/CatCards";
import Slide from "../../../utils/infinitescroll/Slide";
import "./section4.scss";
function Section4() {
  return (
    <div className="sectionstyle4">
      <div className="sectionmargin">
        <div className="contentsection">
          <h1>Make It Real</h1>
          <p className="paragraph">
          Turn your ideas into reality with Make It Real.
          </p>
        </div>
        <div className="slidersection">
        <Slide slidesToShow={5} arrowScroll={5}>
          {cards.map((card) => (
            <CatCards key={card.id} item={card} />
          ))}
        </Slide>
        </div>
        <div className="buttonContainer">
        <button>View More</button>
        </div>
      </div>
    </div>
  );
}

export default Section4;
