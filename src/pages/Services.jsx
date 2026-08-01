import React from "react";
import "../css/service.css";
import { Link } from "react-router-dom";
import instant from ".././images/instant.webp"
import minimal from ".././images/minimal.webp"
import online from ".././images/online.jpg"
import flexible from ".././images/flexible.webp"
import repayment from ".././images/repayment.webp"
import collateral from ".././images/collateral.webp"
import { Helmet } from "react-helmet";

const STATS = [
  { number: "10 min", label: "Average Approval" },
  { number: "15,000+", label: "Loans Disbursed" },
  { number: "100%", label: "Secure Process" },
  { number: "10,000+", label: "Happy Customers" },
];

const SERVICES = [
  {
    image: instant,
    alt: "Loan officer approving a salary loan application",
    title: "Quick Approval",
    desc: "At Salary Topup, we offer fast loan approvals — often within minutes.",
  },
  {
    image: minimal,
    alt: "Minimal paperwork required for a personal loan",
    title: "Quick Paperwork",
    desc: "Personal loans with minimal paperwork — simpler than traditional banks.",
  },
  {
    image: online,
    alt: "Applying for a loan online from a laptop",
    title: "Digital Application",
    desc: "Salary Topup lets you apply online — anytime, anywhere.",
  },
  {
    image: flexible,
    alt: "Flexible loan terms written on a chalkboard",
    title: "–Loan Your Way",
    desc: "Short-term loans offer flexible eligibility and faster approvals.",
  },
  {
    image: repayment,
    alt: "Loan repayment schedule on a calendar",
    title: "Payback Time",
    desc: "Repay personal loans within 7 to 40 days.",
  },
  {
    image: collateral,
    alt: "Couple holding a sign showing no collateral is needed",
    title: "Collateral-Free",
    desc: "Personal loans are unsecured — no need for collateral like a house or vehicle.",
  },
];

const Services = () => {
  return (
    <>
    <Helmet>
        <title>Instant salary Loans Online – Fast, Flexible & Secure</title>
        <meta property="og:title" content="Instant salary Loans Online – Fast, Flexible & Secure" />
        <meta name="description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <meta property="og:description" content="Get instant approval, minimal paperwork & secure salary loans online. Trusted by 10,000+ customers. No collateral required – Apply now with Salary Top up." />
        <link rel="canonical" href="https://salarytopup.com/services" />
    </Helmet>
      {/* Hero Section */}
      <section className="hero-service">
        <div className="container-service">
          <div className="hero-content-service">
            <h1>
              Instant Loans <span className="highlight-service">You Can Trust</span>
            </h1>
            <p>
            Quick, transparent loans for instant access to funds — your trusted financial partner for every need.
            </p>
            <Link to="/apply-now" className="btn btn-cta-service">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container-service">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <div className="stat-number-s">{stat.number}</div>
                <div className="stat-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container-service">
          <div className="section-header">
            <h2>
              Our <span className="highlight-service">Services</span>
            </h2>
            <p>Solutions that match your financial goals</p>
          </div>

          <div className="services-grid-s">
            {SERVICES.map((service) => (
              <div className="service-card-s" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt={service.alt} />
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <Link to="/apply-now" className="btn btn-primary">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container-service">
          <h2>Ready for Instant loan?</h2>
          <p>
            Apply now and get your funds disbursed in as little as 10 minutes
            after approval.
          </p>
          <div className="cta-buttons">
            <Link to="/apply-now" className="btn btn-cta-service">
              Apply Now
            </Link>
            <Link to="/contact" className="btn btn-cta-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
