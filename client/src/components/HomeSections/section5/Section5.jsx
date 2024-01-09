import React, { useState } from "react";
import "./section5.scss";
function Section5() {
  return (
    <div className="section5">
      <div>
        <h1 className="Heading">OUR STATS</h1>
        <p>
          Our impressive statistics underscore our commitment to excellence:<br/>
          thousands of satisfied learners and professionals have harnessed our
          platform to elevate their skills and achieve their goals.<br/> With a
          steadily growing community, we've facilitated countless successful
          projects and learning journeys.<br/> Our track record speaks volumes about
          the effectiveness of our instructors, the quality of our
          collaborations, and the security of our transactions.<br/> Join our
          platform to become a part of these remarkable statistics and unlock
          your full potential in the world of learning and achievement.
        </p>
      </div>
      <div className="statvalue">
        <div>
          <h1 className="Heading">1.534</h1>
          <div className="innerdata">Active Members</div>
        </div>
        <div>
          <h1 className="Heading">99</h1>
          <div className="innerdata">Country</div>
        </div>
        <div>
          <h1 className="Heading">150</h1>
          <div className="innerdata">Workshops</div>
        </div>
      </div>
    </div>
  );
}

export default Section5;
