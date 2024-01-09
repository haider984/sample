// Import necessary modules and utilities
import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

// Add component definition
const Add = () => {
  // Initialize state variables for managing file uploads
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Use reducer for gig data management
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // Handle input change for form fields
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Add features to the current gig
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";  // Clear the input field after adding the feature
  };

  // Handle uploading of the files
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile); // Upload the cover image
  
      // Upload multiple images and store their URLs
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url =  await upload(file);
          return url;
        })
      );

      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } }); // Store the uploaded images' URLs in state
    } catch (err) {
      console.log(err);
    }
  };

  // Utility to navigate to different routes
  const navigate = useNavigate();

  // Setup for react-query to manage server data
  const queryClient = useQueryClient();

  // Define the mutation for creating a new gig
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);  // Post the new gig data to the server
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]); // Refresh the list of gigs upon successful addition
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);  // Send the gig data for creation
    navigate("/mygigs");    // Navigate to the list of user's gigs
  };


  return (
    <div className="add">
      <div className="container">
        <h1>Add New Subject</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="" disabled selected hidden >Select Category </option>
              <option value="Design">Design</option>
              <option value="WebDevelopment">Web Development</option>
              <option value="DataAnalytics">Data Analytics</option>
              <option value="CloudComputing">Cloud Computing</option>
              <option value="CyberSecurity">Cyber Security</option>
              <option value="ArtificialIntelligence">Artificial intelligence</option>
              <option value="MachineLearning">Machine Learning</option>
              <option value="Management">Management</option>
              <option value="HRM">HRM</option>
              <option value="SCM">SCM</option>
              <option value="Finance">Finance</option>
              <option value="Law">Law</option>
              <option value="Cookery">Cookery</option>
              <option value="Journalism">Journalism</option>
              <option value="MassCommunication">MassCommunication</option>
              <option value="Accounts">Accounts</option>
              <option value="Sociology">Sociology</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Nursing">Nursing</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;