import React from "react";
import "./section2.scss";
import Card from "../../../utils/cards/Card";
import icon1 from "./../../../images/postajob.png";
import icon2 from "./../../../images/paysaftey.png";
import icon3 from "./../../../images/Fastbids.png";
function Section2() {
  const cards = [
    {
      title: "Post a job",
      description: "Post a job on our platform and tap into a pool of top-tier talent. Whether you're a company seeking specialized expertise or an individual looking for assistance, our platform makes the process effortless.",
      iconlink: icon1,
    },
    {
      title: "Pay Safety",
      description:"Rest assured about payment safety when posting a job on our platform. We prioritize your security through a robust and transparent payment system. With our secure escrow service, your funds are held safely until the project is completed to your satisfaction.",
      iconlink: icon2,
    },
    {
      title: "Fast Bids",
      description:
        "When you need results quickly, this option allows you to receive bids from skilled freelancers and professionals who are ready to jump into action immediately.",
      iconlink: icon3,
    },
  ];
  return (
    <div className="sectioncontainer2">
      <div className="container">
      <h1 className="headingmargin">Need Something Done ?</h1>
      <p className="paragraph">
        Our platform not only offers access to the best instructors but also
        connects you with a network of skilled professionals ready to help you
        bring your projects to life. Whether it's turning your ideas into
        reality, getting expert advice, or completing tasks efficiently, our
        community of experts is here to support you every step of the way.
      </p>
      <div className="flex">
        {cards.map((carditem) => (
          <Card
            title={carditem.title}
            description={carditem.description}
            iconLink={carditem.iconlink}
            key={carditem.title} // Add a unique key for each card
          />
        ))}
      </div>
      </div>
    </div>
  );
}

export default Section2;
