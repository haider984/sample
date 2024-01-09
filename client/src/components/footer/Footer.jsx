import React,{useState} from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import whitelogo from "../../../public/img/stuAdvisor logo.png";
import phone from "../../../public/footericons/telephone-call.png";
import email from "../../../public/footericons/email.png";
import share from "./../../../public/footericons/arrow.png";
import facebook from "../../../public/footericons/Facebook.png";
import insta from "../../../public/footericons/instagram.png";
import linkedin from "../../../public/footericons/Linkdin.png";
import { useEffect } from "react";
function Footer() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(storedUser);
  }, [currentUser]);
  return (
    <footer className="footer">
      <div className="flex1">
        <div className="content">
          <Link className="link" to="/">
            <img
              src={whitelogo}
              alt="Stuadvisor"
              width="200px"
              height="100px"
            />
          </Link>
          <p>
            Discover an unparalleled learning experience with our platform as
            you engage with the industry's leading experts and instructors.
          </p>
        </div>

        <div className="content">
          <h2>About</h2>
          <Link className="link" to="/history">
            History
          </Link>
          <Link className="link" to="/privacypolicy">
            Terms &amp; Conditions
          </Link>
          <Link className="link" to="/privacypolicy">
            Privacy Policy
          </Link>
        </div>
          {currentUser !== null?
          currentUser?.isSeller === true ? (
             <div className="content">
              <h2>Menu</h2>
              <Link className="link" to="/orders">
                Order
               </Link>
              <Link className="link" to="/messages">
                Message
              </Link>
              <Link className="link" to="/myGigs">
                My Subjects
              </Link>
              <Link className="link" to="/profile">
               Profile
              </Link>
              <Link className="link" to="/add">
                Add Subject
              </Link>
            </div>
          ) : (
            <div className="content">
              <h2>Menu</h2>
              <Link className="link" to="/gigs">
                Explore Consultant
              </Link>
              <Link className="link" to="/orders">
                Order
               </Link>
              <Link className="link" to="/messages">
                Message
              </Link>
              <Link className="link" to="/Meeting">
                Meeting
              </Link>
              <Link className="link" to="/profile">
               Profile
              </Link>
            </div>
          )
      : <div className="content">
      <h2>Menu</h2>
      <Link className="link" to="/gigs">
       Explore Consultant
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
      <Link className="link" to="/register">
        Register
      </Link>
          </div>
          }
          
        <div className="content">
          <h2>Other</h2>
          <Link className="link" to="/">
            Contact Us
          </Link>
          <Link className="link" to="/">
            Help
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex1">
        <div className="container">
          <img
            src={phone}
            className="imageBackShape"
            alt="phone"
            width="30px"
          />
          <h3> +92319-3805712 </h3>
        </div>
        <div className="container">
          <img
            src={email}
            alt="email"
            className="imageBackShape"
            width="30px"
          />
          <h3>
            {" "}
            <span>support@stuadvisors.com</span>{" "}
          </h3>
        </div>
        <div className="container">
          <img
            src={share}
            alt="share"
            className="imageBackShape"
            width="30px"
          />
          <div className="facebook">
            <img src={facebook} alt="share" width="30px" height="30px" />
          </div>
          <div className="insta">
            <img src={insta} alt="share" width="30px" height="30px" />
          </div>
          <div className="linkedin">
            <img src={linkedin} alt="share" width="30px" height="30px" />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex1">
        <div>
          <p>&copy; 2023 Stuadvisors.com | Powered By ReebCode </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
