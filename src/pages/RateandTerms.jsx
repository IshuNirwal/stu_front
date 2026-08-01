import React from "react";
import "../css/ContentPage.css";
import ChatButton from "../components/ChatButton";
import { Link} from "react-router-dom";
import { Helmet } from "react-helmet";


const RateandTerms = () => {
  return (
    <>
      <Helmet>
        <title>Apply for Instant salary Loan Online Now | salary top up</title>
        <meta property="og:title" content="Apply for Instant salary Loan Online Now | salary top up" />
        <meta name="description" content="Get instant financial support with salary top up online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options." />
        <meta property="og:description" content="Get instant financial support with salary top up online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options." />
        <link rel="canonical" href="https://salarytopup.com/rate-and-terms" />
      </Helmet>
      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>Rate and Terms</h2>
            <div style={{ marginTop: "10px" }}>
            <Link
              to="/"
              style={{
                color: "#ffaa32",
                fontWeight: "600",
                marginTop: "10px",
                textDecoration:"none"
              }}
            >
              Home
            </Link>
            <span style={{ color: "white", fontSize: "16px", margin: "0 10px" }}>→</span>
              <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
                Rate and Terms
              </span>
          </div>
        </div>
        </div>

        <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Rate and Terms</h1>
            <div className="flex flex-center space-evenly content_row">
              <div className="content_item" style={{ maxWidth: "90%" }}>
               <p>It will come soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default RateandTerms;
