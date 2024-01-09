import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";  // Utility for making API requests
import { useNavigate } from "react-router-dom";   // Hook for navigating programmatically
import { toast } from "react-toastify";           // Library for displaying toast notifications
import "react-toastify/dist/ReactToastify.css";   // Styles for toast notifications

// Create the Login component
function Login() {
  // Define state for username, password, and any potential error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Instantiate the useNavigate hook
  const navigate = useNavigate();

  // Function to handle the submission of the login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to login with the provided username and password
      const res = await newRequest.post("/auth/login", { username, password });
      // Save the user data to local storage
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // Display a success toast notification
      toast.success("Login successfully", {
        position: toast.POSITION.LEFT,
      });
      // Navigate to the appropriate route based on whether the user is a seller or not
      if(res.data.isSeller){
        navigate("/profile");
      }
      else{
        navigate("/gigs");
      }
      
    } catch (err) {
      // Display an error toast notification in case of a failure
      toast.error("Wrong Username or Password", {
        position: toast.POSITION.LEFT,
      });
      // Set the error state with the received error data
      setError(err.response.data);
    }
  };

  // Render the Login component
  return (
    <div className="login">
      <div class="login-container">
    <div class="login-animation"></div>
   
      <form onSubmit={handleSubmit} class="login-form">
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      </div>
      </div>
  );
}

export default Login;