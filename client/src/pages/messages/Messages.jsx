// Importing required modules and dependencies
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";  // Utility for API requests
import "./Messages.scss";  // Styles for the Messages component
import moment from "moment";  // Library for date manipulation and formatting

const Messages = () => {
  // Get the current user's details from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Initialize the query client for React Query
  const queryClient = useQueryClient();

  // Set up a query to fetch all conversations for the current user
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get(`/conversations`).then((res) => {
      console.log(data);
      return res.data;
    }),
  });

  // Set up a mutation to mark a conversation as read
  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      // Invalidate the conversations query to refetch and update the data
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Function to handle marking a conversation as read
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  // Render the Messages component
  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {console.log(data)}
            {data?.map((c) => (
               console.log(c),
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "active"
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
          <div>
          {data?console.log(data):<h2>No Conversation Yet</h2>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
