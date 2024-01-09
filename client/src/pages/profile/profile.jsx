import React, { useState, useEffect } from "react";
import upload from "../../utils/upload"; // Assuming this is your file upload utility
import "./profile.scss";
import ProfileCard from "../../components/profileCard/ProfileCard";
import newRequest from "../../utils/newRequest";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ReferredEmailForm from "../../components/RefferedEmail/RefferedEmail";
import ConnectAccount from "../../components/ConnectAccount/ConnectAccount";
function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [refferedEmail, setRefferedEmail] = useState(null);

  const [orderCompleteValue, setOrderCompleteValue] = useState(null);
  const [earnings, setEearnings] = useState(null);
  const [refercount, setRefercount] = useState(null);
  const [ordercount, setOrderCount] = useState(null);

  useEffect(() => {
    console.log("inside useEffect");
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(savedUser);
    console.log("user is defined", savedUser);
    setUser({
      img: savedUser?.img,
      country: savedUser?.country,
      desc: savedUser?.desc,
      phone: savedUser?.phone,
    });

    const fetchAnalytics = async (id) => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log("fetch is called", savedUser);
        const orderanalytics = await newRequest.get(
          `/users/${savedUser._id}/orders_analytics`
        );
        setOrderCompleteValue(orderanalytics.data.completedorder);
        setEearnings(orderanalytics.data.totalEarnings);
        setOrderCount(orderanalytics.data.ordercount);
        const refercounts = await newRequest.get(
          `/users/${savedUser._id}/referral_anaylytics`
        );
        setRefercount(refercounts.data.count);
        console.log("order analytics", orderanalytics);
        console.log("refercounts", refercounts);
      } catch (error) {
        console.error("Failed to fetch order analytics:", error);
      }
    };

    if (savedUser && savedUser._id) {
      fetchAnalytics(savedUser._id);
    }
  }, [refferedEmail]);

  const createConnectedAccount = async () => {
    try {
      // ... existing connected account code
      const response = await newRequest.post(
        `/users/${currentUser._id}/create_connected_account`
      );

      if (response.status === 200) {
        const { url } = response.data;
        console.log(url);
        const res = await newRequest.get(`/users/${currentUser._id}`);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        // Redirect the user to Stripe's account setup
        window.location.href = url;
      } else {
        // Handle non-200 status codes (e.g., display an error message)
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle network or parsing errors
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let imgUrl = user.img;
    if (file) {
      imgUrl = await upload(file);
    }

    try {
      const updatedUser = await newRequest.put(`/users/${currentUser._id}`, {
        ...user,
        img: imgUrl,
      });
      if (updatedUser.data) {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser.data));
        setUser(updatedUser.data); // Update the local state only after successful API call
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateReferredEmail = async (userId, referredEmail) => {
    try {
      const response = await newRequest.put(
        `/users/${userId}/add_referred_email`,
        {
          referredEmail,
        }
      );

      if (response.status === 200) {
        const res = await newRequest.get(`/users/${userId}`);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        return "Referred email updated successfully!";
      } else {
        return `Request failed with status ${response.status}`;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return (
        error.message || "An error occurred while updating the referred email"
      );
    }
  };

  return (
    <div className="profile">
      <ProfileCard
        user={currentUser}
        orderCompleteValue={orderCompleteValue}
        earnings={earnings}
        refercount={refercount}
        ordercount={ordercount}
      />
      <ProfileForm
        user={user}
        handleChange={handleChange}
        updateUser={updateUser}
        setFile={setFile}
      />
      <br />
      <hr />
      <br />
      {currentUser.isSeller ? (
        <div>
          <ReferredEmailForm
            existingReferredEmail={currentUser?.refferdEmail ? true : false}
            referEmail={currentUser?.refferdEmail}
            userId={currentUser._id}
            updateReferredEmail={updateReferredEmail}
          />{" "}
          <br />
          <br />
        </div>
      ) : null}
      {!currentUser.isSeller ? (
        <ConnectAccount
          createConnectedAccount={createConnectedAccount}
          connectedAccount={currentUser?.connectedAccount}
        />
      ) : null}
    </div>
  );
}

export default Profile;
