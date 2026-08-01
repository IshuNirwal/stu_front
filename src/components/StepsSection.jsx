import React, { useState, useEffect, useRef } from "react";
import "../css/newDesign.css";
import step1 from "../images/mobileStep1.gif";
import step2 from "../images/mobileStep2.gif";
import step3 from "../images/mobileStep3.gif";
import banner2 from "../images/BANNER 2.png";



const StepsSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isScrollingSteps, setIsScrollingSteps] = useState(false);
  const stepImages = [step1, step2, step3];
  const stepRefs = useRef([]);
  const stepsSectionRef = useRef(null);

  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, 3);
  }, []);

  const handleScroll = () => {
    if (!stepsSectionRef.current) return;

    const stepsSectionRect = stepsSectionRef.current.getBoundingClientRect();
    const isInViewport =
      stepsSectionRect.top <= 0 && stepsSectionRect.bottom > 0;

    setIsScrollingSteps(isInViewport);

    if (isInViewport) {
      stepRefs.current.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        ) {
          setCurrentStep(index + 1);
        }
      });
    }
  };

  const handleStepsScroll = (e) => {
    if (!isScrollingSteps || !stepsSectionRef.current) return;

    const container = stepsSectionRef.current.querySelector(".steps-content");
    const deltaY = e.deltaY;
    const containerScrollHeight =
      container.scrollHeight - container.offsetHeight;
    if (
      container.scrollTop + deltaY < 0 ||
      container.scrollTop + deltaY > containerScrollHeight
    ) {
      setIsScrollingSteps(false);
      return;
    }

    e.preventDefault();
    container.scrollTop += deltaY;
  };

  const handleDotClick = (step) => {
    setCurrentStep(step);
    stepRefs.current[step - 1]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    if (isScrollingSteps) {
      window.addEventListener("wheel", handleStepsScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", handleStepsScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleStepsScroll);
    };
  }, [isScrollingSteps]);

  return (
    <>
      <section className="steps-section" ref={stepsSectionRef}>
        <div className="container">
          <div className="steps-content">
            <div className="step" ref={(el) => (stepRefs.current[0] = el)}>
              <h3 className="steps-title">Apply in simple steps</h3>
              <h5>Fill Basic Details</h5>
              <p>
              Simply complete a quick application form and
                <br />  provide your online banking details to have
                <br /> your application processed in just minutes.
              </p>
            </div>
            <div className="step" ref={(el) => (stepRefs.current[1] = el)}>
              <h5>
                Submit documents
                <br />
                for verification
              </h5>
              <p>
                Provide your KYC and upload your income documents
                <br /> in the app to get verified.
              </p>
            </div>
            <div className="step" ref={(el) => (stepRefs.current[2] = el)}>
              <h5>Get instant funds</h5>
              <p>
                Voila! You're done.
                <br /> You will receive funds within 30 minutes.
              </p>
              <button className="apply-now-btn">Apply Now</button>
            </div>
          </div>

          <div className="steps-image">
            {/* Dynamically change the image based on the currentStep */}
            <img
              src={stepImages[currentStep - 1]}
              alt="Step illustration"
              className="step-illustration"
            />
            <div className="gif-bullets">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  className={`bullet ${currentStep === step ? "active" : ""}`}
                  onClick={() => handleDotClick(step)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="parallax-section2">
        <div className="jumbotron jumbotron-fluid m-0">
          <div className="container text-center">
            <div className="content">
              <div className="left">
                <h6
                  style={{ color: "#109488" }}
                  className="display-2 parallax-heading"
                >
                  Fast, Secure, and Easy 
                </h6>
              </div>
              <div className="right">
                <h3
                  style={{ color: "#109488" }}
                  className="m-0 getMoneyHeading"
                >
                  Apply for Your Personal Loan Today
                </h3>
                <p className="parallax-section2para">
                  Salary Topup is always with you{" "}
                  <br className="d-none d-lg-block" />
                  Need Cash Fast?
                  <br className="d-none d-lg-block" />
                  no question asked !
                </p>
                <button className="apply-now-btn">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-scroll"></div>
      </section>

      
      <div className="home-container">
      <div className="content-wrapper">
        <div className="image-wrapper">
          <img
            src={banner2}
            alt="Person smiling"
            className="profile-image"
            style={{width:"73%"}}
          />
        </div>
        <div className="text-wrapper" style={{lineHeight:"1.1"}} >
          <h1 style={{color:"#109488",fontSize:"1.9rem",fontWeight:"600", textAlign:"right"}} className="title">Running Low on Funds?<br/>Personal Loans Are Here for You!</h1>
          <p className="subtitle">
          charge up your wallet with Salary Topup,
          <br /> feel the power in you.
          </p>
          <button style={{maxWidth:"115px",marginLeft:"71%"}} className="apply-now-btn">Apply Now</button>
        </div>
      </div>
      </div>

      <section className="parallax-section3">
        <div className="jumbotron jumbotron-fluid m-0">
          <div className="container text-center">
            <div className="content3">
              <div className="left3">
                <h6 className="display-2 parallax-heading3">Contact Us</h6>
              </div>
              <div className="right3">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Your Mobile"
                    className="form-input"
                  />
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id="agree" className="checkbox" />
                  <label htmlFor="agree">
                    I agree and consent to receiving all communications from
                    lendingplate in relation to your products.
                  </label>
                </div>
                <button className="apply-now-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="page-scroll"></div>
      </section>
    </>
  );
};

export default StepsSection;
