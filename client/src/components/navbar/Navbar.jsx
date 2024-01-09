import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import logo from "../../../public/img/stuAdvisor logo (2).png";
import "./Navbar.scss";
import whitelogo from "../../../public/img/stuAdvisor logo.png";
function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { pathname } = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const userRef = useRef(null);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      // When the user logs out, remove the 'currentUser' item from localStorage
      localStorage.removeItem("currentUser");
       navigate('/');      
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  // Close the sub-menu when clicking on the image or username
  useEffect(() => {
    const handleClick = (e) => {
      if (userRef.current && userRef.current.contains(e.target)) {
        // Clicked inside the user section, do nothing
        return;
      }
      setShowSubMenu(false);
    };

    if (showSubMenu) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showSubMenu]);

  return (
    <div className={active  ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          {!active ? (
            <Link className="link" to="/">
              <img
                src={whitelogo}
                alt="Stuadvisor"
                width="150px"
                height="75px"
              />
            </Link>
          ) : (
            <Link className="link" to="/">
              <img src={logo} alt="Stuadvisor" width="200px" height="100px" />
            </Link>
          )}
        </div>
        <div className={`menu ${open ? "open" : ""}`}>
          <button className="menu-button" onClick={toggleMenu}>
            {open ? "Close Menu" : "Open Menu"}
          </button>
          <div className={`links ${open ? "open" : ""}`}>
            <Link to="/gigs" className="link">
              Explore the Consultant
            </Link>

            {currentUser ? (
              <div className="user" ref={userRef}>
                <img
                  src={currentUser.img || "/img/noavatar.jpg"}
                  alt=""
                  onClick={toggleSubMenu}
                />
                <span onClick={toggleSubMenu}>{currentUser?.username}</span>
                {console.log(showSubMenu)}
                <div className={`options ${showSubMenu ? "open" : ""}`}>
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Subject
                      </Link>
                      <Link className="link" to="/add">
                        Add New Subject
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                  {!currentUser.isSeller && currentUser != null && (
                    <>
                      <Link className="link" target="_blank" to="/meeting">
                        Meeting
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="link">
                  Sign in
                </Link>
                <Link className="link" to="/register">
                  <button className={active ? "button active" : null}>
                    Join
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
