import React, { useEffect, useState } from "react";
import '../css/Common.css';
import '../css/applyloan.css';
import Login from "./journey-pages/login.jsx";

import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "../Utils/common.js";

const ApplyForLoan = (props) => {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanPeriod, setLoanPeriod] = useState(7);
  const [interestRate, setInterestRate] = useState(0.25);

  const totalInterest = (loanAmount * interestRate * loanPeriod) / 100;
  const totalPayment = loanAmount + totalInterest;


 

  return (
    <>
      <div className="page_wrapper">
       <Login/>

        <div className="apply-landing">
          {/* ELIGIBILITY – up to ₹2 lakh, salaried, age 21+ */}
          <section className="al-eligibility">
            <div className="al-container">
              <div className="al-section-header">
                <h2>Instant Loan up to <span className="al-highlight">₹2 Lakh</span></h2>
                <p>Quick salary loans for salaried employees, aged 21 and above</p>
              </div>
              <div className="al-eligibility-grid">
                {[
                  { icon: "fa-rupee-sign", title: "Up to ₹2 Lakh", text: "Borrow any amount up to ₹2,00,000 as per your need." },
                  { icon: "fa-briefcase", title: "Salaried Employees", text: "Available exclusively for working salaried professionals." },
                  { icon: "fa-id-card", title: "Age 21 & Above", text: "You must be at least 21 years old to apply." },
                  { icon: "fa-university", title: "Direct to Bank", text: "Approved amount credited straight to your bank account." },
                ].map((e, i) => (
                  <div className="al-card" key={i}>
                    <div className="al-card-icon">
                      <i className={`fas ${e.icon}`} aria-hidden="true"></i>
                    </div>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TERMS & CONDITIONS */}
          <section className="al-terms">
            <div className="al-container">
              <div className="al-terms-row">
                {/* Column 1 – T&C header + info cards */}
                <div className="al-terms-left">
                  <div className="al-terms-header">
                    {/* <h2 className="text-center fs-1">Terms &amp; Conditions</h2> */}
                    <h2 className="text-center fs-1">Terms <span className="al-highlight">&amp; Conditions</span></h2>
                    {/* #27607d */}
                    <p className="text-center fs-6">
                      Welcome to <strong>Salary Topup</strong>, powered by{" "}
                      <strong>Baid Stock Broking Services Private Limited</strong>. By accessing or using our website
                       and services, you agree to be bound by
                      the following T&C's.
                    </p>
                  </div>
                  <div className="al-terms-grid">
                  {[
                    // { icon: "fa-calendar-alt", value: "2.9166 %", label: "Monthly Interest Rate" },
                    { icon: "fa-calendar-alt", value: "3%", label: "Monthly Interest Rate" },
                    // { icon: "fa-percent", value: "35% (Fixed)", label: "Offered Annual % Rate" },
                    { icon: "fa-percent", value: "36% (Fixed)", label: "Maximum APR" },
                    // { icon: "fa-clock", value: "1-3 Years", label: "Tenure Period" },
                    { icon: "fa-clock", value: "61-365 Days", label: "Repayment Period" },
                    // { icon: "fa-credit-card", value: "Loan Amount", label: "10K - 5 Lack" },
                    { icon: "fa-credit-card", value: "Loan Amount", label: "5k - 2 Lacs" },
                    { icon: "fa-rupee-sign", value: "2%", label: "Processing Fee" },
                    { icon: "fa-shield-alt", value: "18%", label: "GST on Processing Fee" },
                    { icon: "fa-shield-alt", value: "No Charges", label: "Pre-closure Charges" },
                    { icon: "fa-shield-alt", value: "No Charges", label: "Prepayment Charges" },
                  ].map((t, i) => (
                    <div className="al-terms-card" key={i}>
                      <div className="al-terms-icon">
                        <i className={`fas ${t.icon}`} aria-hidden="true"></i>
                      </div>
                      <div className="al-terms-content">
                        <span className="al-terms-value">{t.value}</span>
                        <span className="al-terms-label">{t.label}</span>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                {/* Column 2 – Representative example */}
                
              </div>
            </div>
          </section>

          {/* PROCESS STEPS – 3 steps */}
          <section className="al-steps-section">
            <div className="al-container">
              <div className="al-section-header">
                <h2>3 Simple <span className="al-highlight">Steps</span></h2>
                <p>From application to money in your bank account</p>
              </div>
              <div className="al-steps">
                {[
                  { step: 1, title: "Fill Application", text: "Complete our simple online application form in just a few minutes." },
                  { step: 2, title: "Get Approval", text: "Our system verifies your details and approves you instantly." },
                  { step: 3, title: "Money in Bank A/c", text: "Approved amount is credited directly to your bank account." },
                ].map((s, i) => (
                  <div className="al-step" key={i}>
                    <div className="al-step-number">{s.step}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LOAN CALCULATOR */}
          <section className="al-calculator" id="loan-calculator">
            <div className="al-container">
              <div className="al-terms-row two-col-row">
                <div className="al-terms-left">
                  <div className="al-illustration px-md-auto px-2">
                    <h3 className="al-illustration-title fs-5">Disbursal Calculation</h3>
                    <div className="al-illustration-sub">
                      <p className="fs-6 fw-semibold text-dark">Representative Example: How Your Salary Topup Loan Works</p>
                      <span>(Example: ₹10,000 Loan)</span>
                    </div>
                    <div className="al-illustration-card">
                      <p className="al-illustration-intro">
                        When you take a loan of ₹10,000 from Salary Topup, here's how
                        the charges and disbursal break down:
                      </p>
                      <div className="al-illustration-rows">
                        <div className="al-ill-row">
                          <span>Processing Fee</span>
                          <span>2% of ₹10,000 = ₹200</span>
                        </div>
                        <div className="al-ill-row">
                          <span>GST on Processing Fee</span>
                          <span>18% of ₹200 = ₹36</span>
                        </div>
                        <div className="al-ill-row">
                          <span>Total Deduction</span>
                          <span>₹236 (2.36% of loan amount)</span>
                        </div>
                        <div className="al-ill-row al-ill-final">
                          <span>Final Disbursed Amount</span>
                          <span>₹10,000 - ₹236 = ₹9,764</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="al-terms-right">
                  {/* <div className="al-section-header">
                    <h2>Loan <span className="al-highlight">Calculator</span></h2>
                    <p>Estimate your repayment before you apply</p>
                  </div> */}

                  <div className="al-calculator-card">
                    <h3 className="al-calc-title">Calculate Your Loan</h3>

                    <div className="al-input">
                      <div className="al-input-label">
                        <label htmlFor="al-loan-amount">Amount</label>
                        <span>₹{loanAmount.toLocaleString()}</span>
                      </div>
                      <input
                        id="al-loan-amount"
                        type="range"
                        min="5000"
                        max="100000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="al-slider"
                      />
                    </div>

                    <div className="al-input">
                      <div className="al-input-label">
                        <label htmlFor="al-loan-period">Period (Days)</label>
                        <span>{loanPeriod} Days</span>
                      </div>
                      <input
                        id="al-loan-period"
                        type="range"
                        min="1"
                        max="60"
                        value={loanPeriod}
                        onChange={(e) => setLoanPeriod(Number(e.target.value))}
                        className="al-slider"
                      />
                    </div>

                    <div className="al-input">
                      <div className="al-input-label">
                        <label htmlFor="al-interest-rate">Interest Rate</label>
                        <span>{interestRate.toFixed(2)}%</span>
                      </div>
                      <input
                        id="al-interest-rate"
                        type="range"
                        min="0.25"
                        max="1"
                        step="0.25"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="al-slider"
                      />
                    </div>

                    <div className="al-result">
                      <div className="al-result-item">
                        <span className="al-result-label">Total Payment</span>
                        <span className="al-result-value">₹{totalPayment.toLocaleString()}</span>
                      </div>
                      <div className="al-result-item">
                        <span className="al-result-label">Processing Fee</span>
                        <span className="al-result-value">2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="al-cta">
            <div className="al-container">
              <h2>Get up to ₹2 Lakh Today</h2>
              <p className="text-white">Apply now and get your funds within minutes</p>
              <button
                type="button"
                className="al-cta-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Check Eligibility
              </button>
              <Link to="/contact" className="al-cta-contact">Contact Us</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ApplyForLoan;
