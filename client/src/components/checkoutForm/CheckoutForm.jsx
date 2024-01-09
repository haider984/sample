// Import required React hooks and libraries
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import './CheckoutForm.scss';

// Define the CheckoutForm functional component
const CheckoutForm = () => {
  // Initializing Stripe and Elements hooks
  const stripe = useStripe();
  const elements = useElements();
  
  // State variables for email, status message, and loading state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect hook to check payment status when Stripe is available
  useEffect(() => {
    // Return if Stripe hasn't loaded yet
    if (!stripe) {
      return;
    }

    // Extract the clientSecret from URL params, used for retrieving payment intent
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    // Retrieve payment intent using the clientSecret and set appropriate message
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form action
    e.preventDefault();

    if (!stripe || !elements) {
      // Make sure Stripe has loaded before allowing form submission
      return;
    }

    // Indicate the start of the payment process
    setIsLoading(true);

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect URL after payment
        return_url: "http://localhost:5173/success",
      },
    });
    
    // Handle potential errors during payment
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    // Indicate the end of the payment process
    setIsLoading(false);
  };

  // Options for the PaymentElement component
  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="paymentform">
      <form id="payment-form" onSubmit={handleSubmit}>
      
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Display any payment-related messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

// Export the CheckoutForm component for use in other parts of the app
export default CheckoutForm;
