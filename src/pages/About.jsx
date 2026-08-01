import React from "react";
import "../css/about.css";
import aboutus from "../images/aboutus.webp";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
    <Helmet>
        <title>Instant salary Loans for Salaried Professionals | Salary Topup</title>
        <meta property="og:title" content="Instant salary Loans for Salaried Professionals | Salary Topup" />
        <meta name="description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply in 10 mins!" />
        <meta property="og:description" content="Get fast, fully digital salary loans with instant approval & minimal documents. Trusted NBFC for salaried professionals across India – Apply in 10 mins!" />
        <link rel="canonical" href="https://salarytopup.com/about-us" />
    </Helmet>

      {/* About Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1>
              Getting salary loans online made easy
              </h1>
              <p style={{ textAlign: "justify" }}>
              Salary Topup is an RBI-registered NBFC, committed to providing Instant approval salary loans, making your life seamless and hassle-free.
              </p>
            </div>
          </div>
        </div>
        <div className="about-hero-shape"></div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="highlight">Story</span></h2>
            <p>Building financial bridges</p>
          </div>
          <div className="story-content">
            <div className="story-image">
              <img src={aboutus} alt="SalaryTopUp journey timeline" />
            </div>
            <div className="story-text">
              <p style={{ textAlign: "justify" }}>
                At SalaryTopup, we understand that financial needs can arise anytime—whether it is an emergency
                or the pursuit of personal aspirations. As a tech-driven NBFC in India, we specialize in offering
                salary loans online with fast, secure, and fully digital loan approval for salaried professionals.
                Whether you are facing a sudden medical bill, planning a vacation, organizing a celebration, or buying
                a gift, our instant salary loans are designed to help you meet your financial goals with ease. With
                SalaryTopup, you can apply for an advance salary loan online and receive instant loan approval in just
                10 minutes. Our online salary loan process is 100% digital, requiring loans with less documents, and
                ensures quick disbursals so you can avoid the hassles of traditional lenders. We are proud to offer
                salary loans online in India that are transparent, efficient, and built around your convenience. From
                fast loans to personal loans for salaried professionals, our platform offers salary loan online in India
                solutions tailored to your needs. You can even check your eligibility using our EMI calculator for Salary
                Topup Loan. Whether you are seeking a loan on car, loan online on salary, or simply need a quick salary loan,
                Salary Topup is your trusted partner for online loan approval in minutes. Experience the ease of digital loan
                approval today with instant loans India designed for professionals like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-box">
              <div className="mission-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p style={{ textAlign: "justify" }}>
                At SalaryTopup, our mission is to simplify and redefine personal finance for salaried
                professionals by offering fast, flexible, and fully digital salary loans online tailored
                to individual needs. We aim to make salary loan access in India more inclusive, responsible,
                and empowering—helping customers navigate both planned goals and unplanned expenses with
                instant loan solutions delivered with integrity and speed. As a leading NBFC in India, we
                utilize advanced technology to provide a seamless borrowing journey—from application to
                online loan approval in minutes and quick disbursal. Our digital loan approval process ensures
                a secure, transparent, and hassle-free experience, with instant approval salary loan options
                and loans with less documents to support your immediate needs. Whether you are applying for
                an advance salary loan online, seeking a loan online on salary, or using our EMI calculator
                for SalaryTopup Loan, we are here to support your financial decisions with clarity and convenience.
                We also prioritize financial literacy and responsive customer support, empowering you to make
                informed choices and stay in control of your financial well-being. Choose SalaryTopup for online
                salary loans in India that combine trust, speed, and innovation.
                </p>
            </div>
            <div className="vision-box">
              <div className="vision-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p style={{ textAlign: "justify" }}>
                At SalaryTopup, our vision is to become a trusted leader in digital lending in India, empowering
                the nation’s salaried professionals with easy, fast, and reliable access to online salary loans—whenever
                they need it. We imagine a future where getting a personal loan for salaried professionals is as simple
                and stress-free as making a digital payment: instant, secure, and completely transparent. By bridging
                the gap between traditional finance and today’s digitally savvy consumer, we are redefining how salary
                loans online in India are accessed. Using advanced technology, real-time data, and a customer-first
                approach, we deliver instant salary loans, loan online on salary, and salary loan online with instant
                approval—helping you meet your financial needs without delays or complications. Through responsible
                lending, innovation, and financial inclusion, SalaryTopup is committed to building a future where every
                individual can pursue their goals, dreams, and life’s key moments without being limited by financial
                barriers. Whether it is a quick salary loan, an advance salary loan online, or using our EMI calculator
                for SalaryTopup Loan, we are here to offer digital loan approval and instant loans India—empowering
                professionals with confidence and control over their financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Numbers Section */}
      <section className="our-numbers">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="highlight">Impact</span></h2>
            <p>Numbers that define our journey</p>
          </div>
          <div className="numbers-grid">
            <div className="number-card">
              <div className="number">15,000+</div>
              <div className="number-label">Loans Disbursed</div>
            </div>
            <div className="number-card">
              <div className="number">₹50Cr+</div>
              <div className="number-label">Total Loan Amount</div>
            </div>
            <div className="number-card">
              <div className="number">10,000+</div>
              <div className="number-label">Happy Customers</div>
            </div>
            <div className="number-card">
              <div className="number">250+</div>
              <div className="number-label">Finance Experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Experience Financial Freedom Today</h2>
            <p style={{ textAlign: "justify" }}>
              Join thousands of satisfied customers who have experienced instant loan at their fingertips.
            </p>
            <a href="/apply" className="btn btn-cta-about">Apply For a Loan</a>
            <a href="/contact" className="btn btn-outline">Contact Our Team</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
