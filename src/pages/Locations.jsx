import React from "react";
import location_img from "../images/location.jpg";
import { Link } from "react-router-dom";
import "../css/ContentPage.css";
import { FaArrowAltCircleRight } from "react-icons/fa";
import ChatButton from "../components/ChatButton";

const Locations = () => {
  return (
    <>
      <div className="content_page_wrapper">
        <div className="content_page_banner_wrapper">
          <div className="content_page_banner_wrapper_overlay">
            <h2>Areas of Operation</h2>
          </div>

          <div className="text_content_wrapper">
            <div className="text_content">
              <div className="content_banner">
                <img src={location_img} alt="" />
              </div>
              <h1 className="page_title mt30 mb20">
                Areas We Provide Services In
              </h1>
              <p>
                Listed below are the areas we provide our services in. If you
                live in any of these areas and need financial support. Head to
                the dedicated location page now :
              </p>
              <div className="flex full-width">
                <ul className="locations_list">
                  <div className="location_container">
                    <li>
                      <Link to="/Instant-Personal-Loan-for-Salaried-in-Delhi">
                        {" "}
                        <FaArrowAltCircleRight className="content_right_icon" />{" "}
                        New Delhi / Delhi
                      </Link>
                    </li>
                    <li>
                      <Link to="/instant-personal-loan-online-in-hyderabad">
                        {" "}
                        <FaArrowAltCircleRight className="content_right_icon" />{" "}
                        Hyderababad
                      </Link>
                    </li>
                  </div>
                  <div className="location_container">
                    <li>
                      <Link to="/instant-personal-loan-in-ahmedabad">
                        {" "}
                        <FaArrowAltCircleRight className="content_right_icon" />{" "}
                        Ahmedabad
                      </Link>
                    </li>
                    <li>
                      <Link to="/loan-agency-in-mumbai">
                        {" "}
                        <FaArrowAltCircleRight className="content_right_icon" />{" "}
                        Mumbai
                      </Link>
                    </li>
                  </div>
                  <div className="location_container">
                    <li>
                      <Link to="/advance-loans-Online-in-Bangalore">
                        {" "}
                        <FaArrowAltCircleRight className="content_right_icon" />{" "}
                        Banglore
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default Locations;
