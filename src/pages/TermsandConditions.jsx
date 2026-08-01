import React from "react";
import "../css/ContentPage.css";
import ChatButton from "../components/ChatButton";
import { Link} from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsandConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Salary Top Up Loans India</title>
        <meta property="og:title" content="Terms and Conditions | Salary Top Up Loans India" />
        <meta name="description" content="Review Salary Topup's terms & conditions for loan eligibility, approval, repayment, interest rates, and privacy policy. Stay informed before applying online." />
        <meta property="og:description" content="Review Salary Topup's terms & conditions for loan eligibility, approval, repayment, interest rates, and privacy policy. Stay informed before applying online." />
        <link rel="canonical" href="https://salarytopup.com/termsandconditions" />
      </Helmet>
      <div className="page_wrapper">
        <div className="page_banner_wrapper">
          <div className="page_banner_wrapper_overlay">
            <h2>Terms and Conditions</h2>
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
                T&C
              </span>
          </div>
        </div>
        </div>

        <div className="text_content_wrapper">
          <div className="text_content" style={{ width: "95%" }}>
            <h1 className="page_title mt30 mb50">Terms and Conditions</h1>
            <h1>Welcome to Salary Topup</h1>
            <p>Powered by Baid Stock Broking Services Private Limited.</p>

            <p>If you visit our website and use our services, you agree to be bound by the following terms and conditions.</p>

            <p>We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page with the updated date, and your continued use of our services constitutes acceptance of those changes.</p>

            <h2>Please Read Carefully All Terms & Conditions</h2>

            <h3>1. Eligibility Criteria</h3>
            <ul>
              <li><strong>Age Requirement:</strong> You must be at least 18 years of age to apply for a loan.</li>
              <li><strong>Residency Requirement:</strong> You must be a legal resident of the country.</li>
              <li><strong>Bank Account Requirement:</strong> You must have a bank account in your own name in the country where you live.</li>
            </ul>

            <h3>2. Loan Application Process</h3>
            <ul>
              <li><strong>How to Apply:</strong> To apply for a loan, visit the website, click on “Apply Now,” and complete the online application process.</li>
              <li><strong>Required Documentation:</strong> You may need to provide the following:</li>
              <ul>
                <li>Latest 3-month salary slip & latest 6-month bank statement</li>
                <li>Aadhaar card (front and back) and PAN card</li>
                <li>Electricity bill (if own house or rented) and rent agreement</li>
                <li>One bill from: Wi-Fi bill, credit bill, gas bill, or water bill</li>
                <li>Two reference numbers with names and relationships</li>
                <li>Office address and email ID with landmark (work from home or office)</li>
                <li>WhatsApp current location and an alternate mobile number</li>
              </ul>
            </ul>

            <h3>3. Loan Approval and Disbursement</h3>
            <ul>
              <li><strong>Approval Process:</strong> Once we evaluate your application and documentation, if approved, you will receive a loan offer.</li>
              <li><strong>Disbursement Timeline:</strong> Upon approval, the loan will be processed and disbursed. Approval and disbursement times may vary based on the completeness and accuracy of your application and documents.</li>
            </ul>

            <h3>4. Repayment & Interest Rate Terms</h3>
            <ul>
              <li><strong>Repayment Schedule:</strong> Repayments will be made based on the agreed schedule. Failure to repay on time may result in penalties or other actions as specified in the loan agreement.</li>
              <li><strong>Interest Rates:</strong> Loan interest rates will be disclosed in the loan agreement, which is 1% per day.</li>
              <li><strong>Late Payments and Penalties:</strong> Late payments may incur additional fees. If payments are not received by the due date, further penalties may apply.</li>
              <li><strong>No Hidden Fees:</strong> We are committed to transparency. All fees and charges will be clearly disclosed before you accept any loan offer.</li>
            </ul>

            <h3>5. Prohibited Activities</h3>
            <ul>
              <li><strong>Fraudulent Activities:</strong> You agree not to engage in any fraudulent activities or misrepresent your identity during the loan process.</li>
              <li><strong>Legal Compliance:</strong> You must respect all local laws and regulations while using our services, including any specific financial regulations in your country of residence.</li>
            </ul>

            <h3>6. Privacy Policy</h3>
            <ul>
              <li><strong>Data Collection:</strong> We collect personal and financial information during the loan application process to evaluate eligibility, provide services, and improve user experience.</li>
              <li><strong>Data Usage:</strong> Your data will only be used for processing your loan application, communicating with you, and providing customer support.</li>
              <li><strong>Data Protection:</strong> We take data security seriously and protect your personal information from unauthorized access.</li>
            </ul>

            <h3>7. Termination of Services</h3>
            <ul>
              <li><strong>Grounds for Termination:</strong> We reserve the right to terminate services for violation of these Terms, non-payment of loans, or any other breach of agreement.</li>
              <li><strong>Process of Termination:</strong> If services are terminated, you will be notified, and all outstanding obligations must be fulfilled.</li>
            </ul>

            <h3>8. Limitation of Liability</h3>
            <ul>
              <li><strong>Scope of Liability:</strong> Our liability is limited to the maximum extent permitted by law, and we are not liable for any indirect, incidental, or consequential damages.</li>
              <li><strong>Exclusion of Indirect Damages:</strong> We are not responsible for damages resulting from delays, loss of profits, or other indirect consequences of using our services.</li>
              <li><strong>Maximum Liability:</strong> The maximum liability we are responsible for is limited to the total amount of the loan you applied for.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about these Terms, please contact us at:</p>
            <ul>
              <li>Email: <a href="mailto:Customercare@salarytopup.com">Customercare@salarytopup.com</a></li>
              <li>Phone: <a href="tel:+919355753533">+91 9355753533</a></li>
            </ul>

            <p>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. Failure to do so may result in you being held accountable for any losses.</p>

          </div>
        </div>
      </div>
      <ChatButton />
    </>
  );
};

export default TermsandConditions;
