// Import required libraries, components, and utilities
import React, { useState, useEffect } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib"; // Import slider from library
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { useNavigate } from "react-router-dom";

// Gig component to display gig details
function Gig() {
  // Extract gig ID from the URL
  const { id } = useParams();

  // State to manage current user information
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState();

  // For navigation between routes
  const navigate = useNavigate();

  // Query to fetch gig information
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => {
      console.log(res.data);
      return res.data;
    }),
  });

  // Handler for initiating chat between users
  const handleChat = async () => {
    const sellerId = userId;
    const buyerId = currentUser;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      console.log(res);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      console.log("inside catch");
      if (err.response.status === 404) {
        try {
          const res = await newRequest.post(`/conversations/`, {
            to: currentUser.seller ? buyerId : sellerId,
          });
          navigate(`/message/${res.data.id}`);
        } catch {
          navigate(`/message/${res.data.id}`);
        }
      }
    }
  };

  // Extracting the user ID from gig data
  const userId = data?.userId;

  // Update current user information from local storage when data changes
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(savedUser);
    const userId = data?.userId;
    setUser(userId);
  }, [data]);

  // Query to fetch user's data
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
      return res.data;
    }),
    enabled: !!userId, // Execute query only if userId exists
  });
  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              {/* Your breadcrumb content here */}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array.from(
                      { length: Math.round(data.totalStars / data.starNumber) },
                      (_, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      )
                    )}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            {data?.images && data.images.length ? (
              <Slider
                slidesToShow={data.images.length ? 1 : 0}
                arrowsScroll={1}
                className="slider"
              >
                {data.images.map((img) => (
                  <img key={img} src={img} alt="" />
                ))}
              </Slider>
            ) : null}
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array.from(
                          {
                            length: Math.round(
                              data.totalStars / data.starNumber
                            ),
                          },
                          (_, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          )
                        )}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button onClick={handleChat}>Let's Talk</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews
              gigId={id}
              buyerOption={!currentUser?.isSeller && currentUser !== undefined}
            />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {currentUser?.isSeller === false ? (
              <Link to={`/pay/${id}`}>
                <button>Continue</button>
              </Link>
            ) : null}
            {currentUser === null ? (
              <Link to={`/login`}>
                <button>Continue</button>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
