// Importing necessary dependencies
import React, { useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// Initializing the stripe client
const stripePromise = loadStripe(
  "pk_test_51NrcNBSJi37gBR2eJv9ngV9CaAJOk1HseBUWONPLhDb50NhCVsQ8p78zVofF2FgmXFozSEUQHcgiSIjNcHpBKtxm00FFJNc73X"
);

// Main component
const Pay = () => {
  // State management for client secret and price
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(null);
  
  // Get ID from route params
  const { id } = useParams();

  // Fetch client secret for payment
  const fetchClientSecret = async () => {
    try {
      if(price>0){
      const res = await newRequest.post(
        `/orders/create-payment-intent/${id}`,
        {
          price: price,
        }
      );
      setClientSecret(res.data.clientSecret);
    }
    } catch (err) {
      console.log(err);
    }
  };

  // Stripe appearance options
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Render the component
  return (
    <div className="pay">
      {!clientSecret && (
        <>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            required
            id="price-input"
          />
          <button onClick={fetchClientSecret}>Submit Price</button>
        </>
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
