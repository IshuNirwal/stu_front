import React, { useEffect, useState } from "react";
import landingpage from "../images/landingpage.webp";
import "../css/topup.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanPeriod, setLoanPeriod] = useState(7);
  const [interestRate, setInterestRate] = useState(0.25);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Rahul Sharma",
      text: "Salary TopUp saved me during an unexpected medical emergency. The process was incredibly smooth, and I had the money I needed in minutes.",
      role: "IT Professional, Bangalore"
    },
    {
      name: "Priya Patel",
      text: "I was skeptical at first, but the transparency and ease of using Salary TopUp won me over. No hidden charges as promised!",
      role: "Marketing Manager, Mumbai"
    },
    {
      name: "Akash Gupta",
      text: "The paperless process is a game-changer. Everything was done digitally, and I didn't have to visit any office or submit physical documents.",
      role: "Teacher, Delhi"
    }
  ];

  const totalInterest = (loanAmount * interestRate * loanPeriod) / 100;
  const totalPayment = loanAmount + totalInterest;

  // ✅ Animate sections on scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll(".feature-card, .step, .testimonial, .cta-content")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ✅ Testimonial slider with React state
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <>
      <Helmet>
        <title>Apply for Instant salary Loan Online Now | Salary TopUp</title>
        <meta
          name="description"
          content="Get instant financial support with Salary TopUp online salary loan application. Apply now for quick approval, flexible terms, and convenient repayment options."
        />
        <link rel="canonical" href="https://salarytopup.com/" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bubbles" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <i className="fas fa-shield-alt" aria-hidden="true"></i>
              RBI-Registered NBFC
            </span>
            <h1>Your Gateway To <span className="highlight">Instant Salary Loans</span> In India</h1>
            <h2>Online salary loan in 10 minutes</h2>
            <p>
              Experience hassle-free borrowing with our modern salary loans
              online platform – Get a salary loan in India instantly. Quick salary
              solution – your salary loan online in India made easy.
              </p>
              <div className="hero-buttons">
                <Link to="/apply-now" className="btn-cta">Apply Now</Link>
                <Link to="/repay-loan" className="btn-outline">Pay Now</Link>
              </div>
              <div className="hero-trust">
                <span><i className="fas fa-bolt" aria-hidden="true"></i> Approval in minutes</span>
                <span><i className="fas fa-lock" aria-hidden="true"></i> 100% secure</span>
                <span><i className="fas fa-file-alt" aria-hidden="true"></i> Minimal documents</span>
              </div>
            </div>
            <div className="hero-image-home">
              <img src={landingpage} alt="Happy customer using SalaryTopUp app" />
            </div>
          </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose <span className="highlight">Salary TopUp ?</span></h2>
            <p>Instant loan approval made easy</p>
          </div>
          <div className="features-grid">
            {[
              { icon: "fa-shield-alt", title: "Tap & Apply", text: "Apply anytime, from anywhere" },
              { icon: "fa-file-alt", title: "Minimal Documentation", text: "Quick and paperless" },
              { icon: "fa-hand-holding-usd", title: "Trusted & Verified", text: "Robust data protection & regulatory adherence" },
              { icon: "fa-bolt", title: "Customer-First Approach", text: "Fast support and clear communication" },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <i className={`fas ${f.icon}`} aria-hidden="true"></i>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="feature-line"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="our-services" id="our-services">
        <div className="container">
          <div className="services-header">
            <h2>
              <span className="highlight">Financial Solutions</span> for salaried professionals
            </h2>
            <p>Choose the service that best fits your current financial need</p>
          </div>
          <div className="services-grid">
            {[
              { icon: "fa-clock", title: "Instant Approval", text: "Salary TopUp: Instant loan approvals in minutes" },
              { icon: "fa-file-alt", title: "Paper-Light Process", text: "Loans with less paperwork than banks." },
              { icon: "fa-file-alt", title: "Digital Apply", text: "Loan Approved in Minutes" },
              { icon: "fa-sync-alt", title: "Adaptable", text: "Enjoy flexible salary loans online" },
            ].map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon"><i className={`fas ${s.icon}`} aria-hidden="true"></i></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/apply-now" className="btn btn-primary">
              Apply Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It <span className="highlight">Works</span></h2>
            <p>Three simple steps to digital loan approval</p>
          </div>
          <div className="steps">
            {[
              { step: 1, title: "Apply Online", text: "Fill out our simple application form in less than 5 minutes" },
              { step: 2, title: "Quick Verification", text: "Our automated system verifies your information instantly" },
              { step: 3, title: "Receive Funds", text: "Money deposited directly to your bank account within minutes" },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-number">{s.step}</div>
                <div className="step-content">
                  <h3>{s.step}. {s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cta-container">
            <Link to="/apply-now" className="btn-cta">Apply For a Loan Now</Link>
          </div>
        </div>
      </section>

      {/* FINANCIAL STRATEGY SECTION (Loan Calculator) */}
      <section className="financial-strategy" id="financial-strategy">
        <div className="container">
          <div className="section-header text-center">
            <h2>Building Insightful <span className="highlight">Financial Strategies</span></h2>
          </div>
          <div className="strategy-content">
            {/* Loan Calculator */}
            <div className="loan-calculator-card">
              <h3 className="calculator-title">Loan Calculator</h3>

              <div className="calculator-input">
                <div className="input-label-group">
                  <label htmlFor="loan-amount">Amount:</label>
                  <span id="amount-value">₹{loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="calculator-input">
                <div className="input-label-group">
                  <label htmlFor="loan-period">Period (Days):</label>
                  <span id="period-value">{loanPeriod} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={loanPeriod}
                  onChange={(e) => setLoanPeriod(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="calculator-input">
                <div className="input-label-group">
                  <label htmlFor="interest-rate">Interest Rate</label>
                  <span id="rate-value">{interestRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="1"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="slider"
                />
              </div>

              <div className="calculator-result">
                <div className="result-item">
                  <span className="result-label">Total Payment:</span>
                  <span id="total-payment" className="result-value">
                    ₹{totalPayment.toLocaleString()}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Processing Fee:</span>
                  <span className="result-value">2%</span>
                </div>
              </div>
            </div>

            {/* Loan Purposes + Stats */}
            <div className="strategy-info">
              <div className="loan-purposes">
                <h3>Personal Loan Options</h3>
                <div className="loan-types-grid">
                  {["Travel", "Medical", "Wedding", "Gifting", "Education", "Two-Wheeler", "Home Renovation", "Special Occasions"].map((type, i) => (
                    <div className="loan-type-item" key={i}>
                      <div className="loan-type-icon">
                        <i className={`fas ${["fa-plane", "fa-heartbeat", "fa-ring", "fa-gift", "fa-graduation-cap", "fa-motorcycle", "fa-home", "fa-calendar-alt"][i]}`} />
                      </div>
                      <div className="loan-type-text">{type}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="strategy-stats">
                {["15,000+", "10k+", "250+"].map((num, i) => (
                  <div className="stat-item" key={i}>
                    <div className="stat-icon"><i className={["fas fa-hand-holding-usd", "fas fa-smile", "fas fa-user-tie"][i]} /></div>
                    <h3 className="stat-number">{num}</h3>
                    <p className="stat-text">{["Loans Approval", "Happy Users", "Finance Experts"][i]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our <span className="highlight">Customers Say</span></h2>
          </div>
          <div className="testimonials-container">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial ${i === currentSlide ? "active" : "hidden"}`}
              >
                <p>"{t.text}"</p>
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Apply now and get your emergency funds within minutes</p>
            <Link to="/apply-now" className="btn-cta">Apply Now</Link>
            <Link to="/contact" className="btn-outline">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;