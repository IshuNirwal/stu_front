import React, { useState, useEffect } from 'react';
import "../css/Common.css";
import banner_img1 from '../images/banner_1.webp';
import banner_img2 from '../images/banner_2.webp';

// Array of images for the slider
const images = [banner_img1, banner_img2];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to change image
    const changeImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Set interval to change image every 3 seconds (3000ms)
    const intervalId = setInterval(changeImage, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Functions to handle manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="banner_wrapper">
      <button className="control_btn prev" onClick={handlePrev}>◀</button>
      <div className="banner_img_container">
        <img src={images[currentIndex]} alt="Banner" className="banner_img" />
        {/* <div className="banner_text">
          <h1>We're Salarytopup</h1>
          <p>Small icons showing fast approval, secure process, or money transfer.</p>
        </div> */}
      </div>
      <button className="control_btn next" onClick={handleNext}>▶</button>
    </div>
  );
};

export default Banner;
