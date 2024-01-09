import React, { useEffect } from "react";
import Section1 from "../../components/HomeSections/section1/Section1";
import Section2 from "../../components/HomeSections/section2/Section2";
import Section3 from "../../components/HomeSections/section3/Section3";
import Section4 from "../../components/HomeSections/section4/section4";
import Section5 from "../../components/HomeSections/section5/Section5";
import Section6 from "../../components/HomeSections/section6/section6";
import { useNavigate } from "react-router-dom";
import './Home.scss';

const sectionStyle = {
  marginBottom: '0', // Remove bottom margin
};

function Home() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('currentUser'); // Adjust this key if it's different

  useEffect(() => {
    function check (){
      if (userData === null) {
        navigate('/');
      } else {
        navigate('/gigs');
      }
    }
    check();
    
  }, [navigate, localStorage.getItem('currentUser')]);

  console.log("Home component rendered"); // Debug: log component rendering

  return (
    <div className="container">
      <Section1 />
      <Section2 style={sectionStyle} />
      <Section3 style={sectionStyle} />
      <Section4 style={sectionStyle} />
      <Section5 style={sectionStyle} />
      <Section6 style={sectionStyle} />
    </div>
  );
}

export default Home;
