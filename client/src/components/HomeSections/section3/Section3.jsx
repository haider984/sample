import React from "react";
import "./section3.scss";
import mainimage from "../../../images/slideimgare.jpeg";
function Section3() {
  return (
    <>
      <div className="mainsection">
        <div className="textualsection">
          <h1>Why Us?</h1>
          <p>
            Choose us as your preferred learning and project collaboration
            platform because we offer an unparalleled synergy of expertise,
            convenience, and security. With access to top-notch instructors, a
            diverse network of skilled professionals, and a robust payment
            safety system, we create an environment that fosters both learning
            and accomplishment. Our commitment to innovation ensures that you
            can learn from the best, collaborate seamlessly, and achieve your
            goals with confidence. Join us to experience a transformative
            journey where knowledge meets action, backed by a trusted platform
            designed to empower your success.
          </p>
          <button>View More</button>
        </div>
        <div className="nontextualsection">
          <img className="mainimg" src={mainimage} alt={null} />
        </div>
      </div>
    </>
  );
}

export default Section3;
