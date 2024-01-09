import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isSeller: false,
  });
  const [otp, setOtp] = useState(""); // New state for OTP
  const [otpSent, setOtpSent] = useState(false); // New state to keep track of OTP sent status

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value); // New OTP handler
  };

  const handleSeller = (e) => {
    setUser((prevUser) => ({ ...prevUser, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/auth/register", {
        ...user,
      });
      const { otpSent } = response.data;
      console.log("otpSent:", otpSent); // Add this line
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      toast.error("User already exists", {
        position: toast.POSITION.LEFT,
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/verify-otp", {
        username: user.username,
        otp,
      });
      toast.success("Successfully verified", {
        position: toast.POSITION.LEFT,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Invalid OTP", {
        position: toast.POSITION.LEFT,
      });
    }
  };

  return (
    <div className="register">
      {!otpSent ? (
        <form onSubmit={handleSubmit}>
          <div className="forminput">
            <h1>Create a new account</h1>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="isSeller">Activate the seller account</label>
              <label className="switch">
                <input
                  name="isSeller"
                  type="checkbox"
                  checked={user.isSeller}
                  onChange={handleSeller}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="submission">
            <button className="submission" type="submit">
              Register
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <div className="left">
            <h1>Verify OTP</h1>
            <label htmlFor="otp">Enter OTP</label>
            <input
              name="otp"
              type="text"
              placeholder="OTP"
              onChange={handleOtpChange}
              value={otp}
            />
            <button type="submit">Verify</button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default Register;
