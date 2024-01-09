import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  // Get current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Local state for complete hit, completed and pending orders
  const [completehit, setCompletehit] = useState(0);
  const [completeOrders, setCompleteOrders] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);

  const navigate = useNavigate();

  // Fetch all orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
  });

  // Fetch completed orders
  const { completeorderdata } = useQuery({
    queryKey: ["CompleteOrders"],
    queryFn: () => newRequest.get(`/orders/getCompleteOrder`).then((res) => {
      setCompleteOrders(res.data);
      return res.data;
    }),
  });

  // Fetch pending orders
  const { pendingOrders } = useQuery({
    queryKey: ["pendingOrder"],
    queryFn: () => newRequest.get(`/orders/getPendingOrders`).then((res) => {
      setPendingOrder(res.data);
      return res.data;
    }),
  });

  // Effect to run on change in completehit state
  useEffect(() => {}, [completehit]);

  // Function to format date
  function handleDate(orderdate) {
    const date = new Date(orderdate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  }

  // Mark an order as complete
  const handleComplete = async (order) => {
    await newRequest.put("/orders/orderComplete", { order });
  };

  // Handle order status change
  const handleStatusChange = async (order) => {
    const res = await newRequest.put(`/orders/changeStatus`, {
      order: order,
    });
    console.log(res);
  };

  // Function to handle contact/messaging between seller and buyer
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
              {currentUser.isSeller ? null : <th>Complete</th>}
            </tr>
            {data?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="messageicon"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                {currentUser.isSeller ? null : (
                  <td>
                    <button
                      className="complete"
                      onClick={() => handleComplete(order)}
                    >
                      Complete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </table>
          <div className="title">
            <h1>Pending Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
              {currentUser.isSeller ? <th>Accept</th> : null}
            </tr>
            {pendingOrders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" width="200px" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="messageicon"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                <td>
                  {currentUser.isSeller ? (
                    <button
                      className="complete"
                      onClick={() => handleStatusChange(order)}
                    >
                      Accept
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </table>
          <div className="title">
            <h1>Completed Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
              <th>Created At</th>
              <th>Completed At</th>
            </tr>
            {completeOrders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" width="200px" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="messageicon"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                <td>{handleDate(order.createdAt)}</td>
                <td>{handleDate(order.updatedAt)}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
