// Import necessary React libraries and styles
import React from "react";
import './ConnectAccount.scss';

// Define the ConnectAccount functional component
function ConnectAccount({createConnectedAccount, connectedAccount}) {
  return (
    <div className="ConnectAccount">
      {/* Display title based on whether the Stripe account is connected */}
      <h3>{connectedAccount ? `Stripe Account Connected` : "Connect Your Stripe Account For Payout"}</h3>
      
      <br/>
      
      {/* Conditionally render content based on the account's connection status */}
      {connectedAccount ? 
        // Display a message if the Stripe account is already connected
        <p>{`Your Stripe account has been successfully connected.${connectedAccount}`}</p> :
        
        // Display a button to initiate Stripe account connection if not connected yet
        <button className="setup-btn" onClick={createConnectedAccount} disabled={connectedAccount}>
          Setup Payment Account
        </button>
      }
    </div>
  );
}

// Export the ConnectAccount component for use in other parts of the app
export default ConnectAccount;
