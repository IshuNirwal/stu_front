import React from "react";
import "../css/ContentPage.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const FAQ = () => {
  return (
    <>
    <Helmet>
        <title>Salary Top up Loan FAQs – Quick Answers to Your Questions</title>
        <meta property="og:title" content="Salary Top up Loan FAQs – Quick Answers to Your Questions" />
        <meta name="description" content="Find answers about Salary Top up loans, eligibility, documents, loan amounts, repayment terms, and more. Learn how our short-term loans work—fast and easy!" />
        <meta property="og:description" content="Find answers about Salary Top up loans, eligibility, documents, loan amounts, repayment terms, and more. Learn how our short-term loans work—fast and easy!" />
        <link rel="canonical" href="https://salarytopup.com/faq" />
    </Helmet>
      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>FAQ's</h2>
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
                Faq's
              </span>
          </div>
        </div>
        </div>


        <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Frequently asked questions</h1>
            <div className="content_row">
              <div className="content_item">
                <h3 className="mb10">What is Salary Topup ?</h3>
                <p>
                Salary Topup is a short-term, unsecured loan offered by Non-Banking Financial Companies (NBFCs) to help individuals meet immediate financial needs.
                </p>
              </div>
              <div className="content_item">
                <h3>How do Salary Topup work?</h3>
                <p>
                Salary Topup are usually small amounts of money, offered without the need for collateral.
                </p>
              </div>
            </div>
            <div className="content_row">
              <div className="content_item">
                <h3 className="mb10"> What is the eligibility to apply for a Loan?</h3>
                <p>
                Eligibility criteria is

You must be at least 21 years of age.
You should be a salaried employee or have a steady source of income.
                </p>
              </div>
              <div className="content_item">
                <h3>How much can I borrow through a Salary Topup Loan?</h3>
                <p>
                The loan amount typically ranges from ₹5,000 to ₹50,000, depending on your income, credit score, and the lending policies.
                </p>
              </div>
            </div>

            <div className="content_row">
              <div className="content_item">
                <h3 className="mb10">
                What is the repayment period for a Salary Topup Loan?
                </h3>
                <p>
                Repayment terms generally range from 7 days to 30 days, often aligning with your payday.
                </p>
              </div>
              <div className="content_item">
                <h3>Do I need to provide collateral to get a Salary Topup Loan? </h3>
                <p>
                No, payday loans are typically unsecured, meaning no collateral is required.
                </p>
              </div>
            </div>
            <div className="content_row">
              <div className="content_item">
                <h3 className="mb10">
                What documents are required to apply for a Salary Topup Loan?
                </h3>
                <p>
                Common documentation includes:

Proof of identity (Aadhar card, passport, voter ID)
Proof of address (electricity bill, rent agreement)
Proof of income (salary slips, bank statements)
Employment proof
                </p>
              </div>
              <div className="content_item">
                <h3>How fast can I receive the loan amount? </h3>
                <p>
                Once your loan application is approved, the funds are typically disbursed quickly,
                 often within 24-48 hours. In some cases, the loan amount may be credited to your
                 bank account within a few hours.
                </p>
              </div>
            </div>
            <div className="content_row">
              <div className="content_item">
                <h3 className="mb10">
                What happens if I miss the loan repayment date?
                </h3>
                <p>
                  If you're unable to repay your loan on time, it's essential to
                  contact Salary Topup immediately to discuss your options.
                  Depending on the circumstances, Salary Topup may offer
                  repayment extensions or alternative arrangements to help you
                  manage your debt.
                </p>
              </div>
              <div className="content_item">
                <h3>Can I prepay or close the loan before the due date?</h3>
                <p>
                Yes, Salary Topup allow you to repay the loan before the due date.
                However, there may be a reduced interest benefit.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

    </>
  );
};

export default FAQ;
