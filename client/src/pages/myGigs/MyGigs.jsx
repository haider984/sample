// Importing required modules and dependencies
import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";  // Styles for the MyGigs component
import getCurrentUser from "../../utils/getCurrentUser";  // Utility to get the current logged-in user's data
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  // React-Query hooks
import newRequest from "../../utils/newRequest";  // Utility for API requests

function MyGigs() {
  // Get the current user's data
  const currentUser = getCurrentUser();
  console.log(getCurrentUser());

  // Initialize the query client for React Query
  const queryClient = useQueryClient();
  
  // Set up a query to fetch all gigs (subjects) associated with the current user
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
      console.log(currentUser.id);
      return res.data;
    }),
  });

  // Set up a mutation to delete a specific gig
  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      // Invalidate the myGigs query to refetch and update the data
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  // Function to handle the deletion of a gig
  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  // Render the MyGigs component

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Subjects</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Subject</button>
              </Link>
            )}
          </div>
          <table>
            
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
