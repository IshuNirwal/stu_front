import React from "react";
import { Link } from "react-router-dom";
import "./404.css"; // Optional: create styling here
import { Helmet } from "react-helmet";


const NotFound = () => {
  return (
    <>
    <Helmet>
        <title>404 - Page Not Found | Salary Topup</title>
        <meta name="robots" content="noindex" />
    </Helmet>
    <div className="notfound-page">
      <div className="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    </div>
    </>
  );
};

export default NotFound;
