import React from "react";
import "./section1.scss";
import imagesrc from "../../../images/Ellipse 1.png";
import bottomgrid from "./../../../images/Gradient Overlay.png";
import topicon from "./../../../images/Shape.png";
import bottomicon from "./../../../images/bottom Shape.png";
import verticalgrid from "../../../images/Vector Smart Object.png";
import {Link} from 'react-router-dom';
function Section1() {
  return (
    <div className="commonstyle">
      <div class="content">
        <div className="textualcontent">
          {" "}
          <h1 className="heading">
            Get To Learn From
            <br />
            Best Instructors
          </h1>
          <p>
            Discover an unparalleled learning experience with our platform as
            you engage with the industry's leading experts and instructors.
            Unlock a world of knowledge and insights as our accomplished
            instructors guide you on a transformative journey, providing you
            with the skills and expertise you need to excel in your pursuits.
            Elevate your learning with the wisdom of the best instructors and
            empower yourself to reach new heights of success.
          </p>
          <Link className="buttonlink" to="/register">Sign Up</Link>
          <div className="bottomimg">
            <img src={bottomgrid} alt={null} />
          </div>
        </div>
        <div>
          <div>
            <div className="topicon">
              <img src={topicon} />
            </div>
            <img className="sectionimg" src={imagesrc} alt="Your Image" />
            <img className="verticalgrid" src={verticalgrid} alt={null} />
            <div className="bottomicon">
              <img src={bottomicon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
