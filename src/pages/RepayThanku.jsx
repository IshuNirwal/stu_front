import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // Import useLocation and useNavigate
import crossIcon from "../images/cross.png";  // Path to your cross icon
import "../css/Common.css";  // Include your common 
import { getStorage } from "../Utils/common";

const RepayThankyou = () => {
  const location = useLocation();  // Hook to access the state passed via navigate
  const navigate = useNavigate();  // Hook to programmatically navigate

  // Extract txnStatus and txnId from location state
  const { txnStatus, txnId } = location.state || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Determine if the transaction was successful
  const isTransactionSuccessful = txnStatus === 'SUCCESS' || txnStatus === 'success';

  // Set the button color based on txnStatus (green for success, red for failure)
  const buttonStyle = isTransactionSuccessful 
    ? { backgroundColor: '#4CAF50' }  // Green for success
    : { backgroundColor: 'red' };  // Red for failure

  useEffect(() => {
    const token = getStorage("token");  // Assuming getStorage is a utility to get data from localStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/my-dashboard");  // Navigate to my-dashboard if logged in
    } else {
      navigate("/");  // Navigate to home page if not logged in
    }
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div 
          className="icon" 
          style={{ 
            width: '80px', 
            height: '80px', 
            margin: '0 auto 20px', 
            backgroundColor: isTransactionSuccessful ? '#8cd9a2' : '#fff',  // Green for success, red for failure
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {/* Conditionally render the success or cross icon */}
          {isTransactionSuccessful ? (
            <img 
              src="https://img.icons8.com/ios-filled/100/ffffff/checked--v1.png" 
              alt="Success Icon" 
              style={{ width: '50%' }} 
            />
          ) : (
            <img 
              src={crossIcon} 
              alt="Failure Icon" 
              style={{ width: '50%' }} 
            />
          )}
        </div>
        <div className="thank-you-message">
          {/* Conditionally render Thank You or Oops message */}
          {isTransactionSuccessful ? (
            <h2>Thank You!</h2>
          ) : (
            <h2 style={{ color: 'red' }}>Oops!</h2>  // Red color for failure
          )}
          <p>Your payment was {txnStatus}.</p>
        </div>
        <div className="redirect-info">
          <p>Your Transaction ID is: {txnId || "N/A"}</p>
          <p>Transaction Status: {txnStatus}</p>
          {/* <p>You will be redirected to the home page shortly.</p> */}
        </div>
        {/* Apply the conditional style to the button and handle click */}
        <button onClick={handleButtonClick} className="thank-you-button" style={buttonStyle}>
          Go to {isLoggedIn ? 'Dashboard' : 'Home'}
        </button>
      </div>
    </div>
  );
};

export default RepayThankyou;
