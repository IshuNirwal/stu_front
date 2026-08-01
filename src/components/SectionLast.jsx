import React from 'react';
import "../css/newDesign.css"
import aboutVideo from "../images/aboutVideo.mp4";
import map from "../images/India-Mps.png"

const SectionLast = () => {
  return (
    <>
    <section className="container video-bg" id="about">
      <div className="video-inner"></div>
      <video className="fullscreen" src={aboutVideo} playsInline autoPlay muted loop></video>
      <div className="content about-section">
        <div className='left'>
        <p>
        Salary Topup is an innovative credit-enabled financial platform that leverages a proprietary credit algorithm and the Social Loan Quotient to provide instant personal loans to salaried millennials in a safe, simple, and efficient manner.

        </p>
        <p>
        Our personal loans range from ₹5,000 to ₹1 lakhs, which can be used for various needs such as weddings, festivals, special occasions, medical expenses, and consumer goods purchases.
        </p>
        <p>
        With a customer-first approach, we prioritize understanding and meeting the specific needs of our clients. When a customer reaches out to us, we are committed to delivering prompt service from the very start.
        
        </p>
        </div>
        <div className='right'>
        <h1>With Salary Topup <br/>discover the smartest and <br/>most convenient way to borrow</h1>
        </div>
      </div>
    </section>
    
    <section className="location-section" id="locations">
        <div className="map-section">
          <div 
            className="image-map"
            data-aos="zoom-in-left" 
            data-aos-duration="2500" 
            data-scale="2.2" 
            data-image="img/India-Mps.png" 
            image="img/India-Mps.png">
          </div>
          <div className="content-map">
            <h4 style={{ color: '#109488' }} className="">
              Present everywhere <br /> Apply from anywhere
            </h4>
            <p>
              With Salary Topup app in your mobile,<br /> feel confident to get a loan from anywhere
            </p>
            <p className="text-lg-right text-center">
            <button className="apply-now-btn">Apply Now</button>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionLast;
