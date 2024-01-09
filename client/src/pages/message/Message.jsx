// Import necessary dependencies
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";  // Utility for making API requests
import "./Message.scss";  // Styles for the Message component

// Create the Message component
const Message = () => {
  // Extract the ID parameter from the route
  const { id } = useParams();
  // Retrieve the current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Initialize the query client
  const queryClient = useQueryClient();

  // Set up a query to fetch messages for a given ID
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  // Set up a mutation to send a new message
  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      // Invalidate the "messages" query to refetch the data
      queryClient.invalidateQueries(["messages"]);
    },
  });

  // Function to handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    // Reset the input value after submission
    e.target[0].value = "";
  };

  // Render the Message component

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link>
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
