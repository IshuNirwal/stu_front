import React, { useState } from "react";
import "../css/Common.css";
import "../css/RepaymentDetails.css"; // Assuming the CSS is defined here
import IndusIndQRImage from "../images/IndusInd_QR.webp";
// import HdfcQRImage from "../images/HdfcQRImage.webp";

// import HDFCQRImage from "../images/HDFC_QRImage.jpeg";
// import ChatButton from "../components/ChatButton";
import { Link, useNavigate } from "react-router-dom";
import PaymentModal from "../components/Payment/PaymentModal";
// import CryptoJS, { enc } from "crypto-js"; // Importing the crypto-js library
import { Helmet } from "react-helmet";

const RepayLoan = (props) => {
  const [content, setContent] = useState("pannumber");
  const [getLoading, setLoading] = useState(false);
  const [getPancard, setPancard] = useState("");
  const [getOtp, setOtp] = useState("");
  const [repaymentData, setRepaymentData] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(); // New state for part payment

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const resp = await fetch("https://salarytopup.in/api/Api/CustomerDetails/Sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
          Accept: "application/json",
        },
        body: JSON.stringify({ pancard: getPancard }),
      });

      if (resp.status === 200) {
        const dataset = await resp.json();
        props.showmessage(dataset.Message);
        if (dataset.Status === 1) {
          setContent("panotp");
        }
      } else {
        const dataset = await resp.json();
        props.showmessage(dataset.Message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!isChecked) {
      props.showmessage("Please accept the terms and conditions to proceed.");
      return; // Prevent OTP verification if checkbox is unchecked
    }

    setLoading(true);
    try {
      const resp = await fetch("https://salarytopup.in/api/Api/CustomerDetails/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Auth: "Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=",
          Accept: "application/json",
        },
        body: JSON.stringify({
          panNumber: getPancard,
          otp: getOtp,
        }),
      });

      if (resp.status === 200) {
        const dataset = await resp.json();
        props.showmessage(dataset.Message);

        if (dataset.Status === 1) {
          const repaymentData = dataset.repayment_data;
          setRepaymentData(repaymentData);
          setOrderId(dataset.order_id);
          setContent("amountfetched");
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  let processing = false;
  const payWithPayU = async () => {
    if (processing) return;
    processing = true;

    setLoading(true);
    try {
      const total_due_amount = paymentAmount || repaymentData.total_due_amount; // Use part payment amount if provided
      const MERCHANT_KEY = "oMcSQ9";
      const productinfo = "Loan repayment for Loan No";
      const fullname = repaymentData.full_name;
      const email = repaymentData.email;
      const phone = repaymentData.mobile;

      const response = await fetch("https://salarytopup.in/api/Api/RepayLoanApi/payuOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
          "Auth": "MjQ4ZmY5MGM0MmM2N2EyOTJlZWE0MTBiNGU2Y2Q2NzU="
        },
        body: JSON.stringify({
          amount: total_due_amount,
          productinfo: productinfo,
          firstname: fullname,
          email: email,
          mobile: phone,
          udf5: repaymentData.lead_id
        }),
      });

      const data = await response.json();

      if (data.Status === 1) {
        const hashData = data.data.parameters;

        const payuOptions = {
          key: MERCHANT_KEY,
          txnid: hashData.txnid,
          amount: total_due_amount,
          productinfo: productinfo,
          firstname: fullname,
          email: email,
          phone: phone,
          surl: "https://salarytopup.com/thanku",
          furl: "https://salarytopup.com/fail",
          hash: hashData.hash,
          udf5: repaymentData.lead_id
        };

        const scriptLoaded = await loadScript("https://jssdk.payu.in/bolt/bolt.min.js");

        if (scriptLoaded) {
          if (typeof window.bolt !== 'undefined') {
            console.log("Bolt Options", payuOptions);
            window.bolt.launch(payuOptions, {
              responseHandler: function (BOLT) {
                console.log(BOLT);
                if (BOLT.response.txnStatus === "SUCCESS") {
                  // Pass the transaction status to the Thank You page via React Router's state
                  navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
                }
                if (BOLT.response.txnStatus === "FAILED" || BOLT.response.txnStatus === "CANCEL") {
                  navigate("/thanku", { state: { txnStatus: BOLT.response.txnStatus, txnId: BOLT.response.txnid } });
                }
              },
              catchException: function (BOLT) {
                console.log(BOLT);
                console.log('Payment failed. Please try again.');
              }
            });
          } else {
            console.error("PayU SDK not initialized correctly after loading.");
          }
        } else {
          console.error("Failed to load PayU script.");
        }
      } else {
        console.error("Failed to get valid response from PayU API.");
      }
    } catch (error) {
      console.error("Error during PayU payment:", error);
    } finally {
      setLoading(false);
      processing = false;
    }
  };

  const payWithPaytm = async () => {
    if (processing) return;
    processing = true;

    setLoading(true);

    try {
      const total_due_amount = paymentAmount || repaymentData.total_due_amount;
      const response = await fetch("https://salarytopup.in/api/post_payment/initialize_paytm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total_due_amount,
          lead_id: repaymentData.lead_id,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      data = JSON.parse(data)
      const bodyData = {}
      bodyData.signature = data.head.signature ? data.head.signature : ""
      bodyData.txnId = data.body.txnToken ? data.body.txnToken : ""
      bodyData.amount = data.amount ? data.amount : ""
      bodyData.orderId = data.orderId ? data.orderId : ""
      bodyData.status = data.body.resultInfo.resultCode == "0000" && data.body.resultInfo.resultMsg == "Success" && data.body.resultInfo.resultStatus == "S" ? data.body.resultInfo.resultMsg : ""
      if (bodyData.status == "" || bodyData.txnId == "" || bodyData.signature == "" || bodyData.amount == "" || bodyData.orderId == "") {
        throw new Error("Transaction Failed Request is invalid Please try again")
      }

      if (bodyData.status === "Success") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action =
          "https://secure.paytmpayments.com/theia/api/v1/showPaymentPage" +
          `?mid=Salary68450894545992&orderId=${bodyData.orderId}`;

        const midInput = document.createElement("input");
        midInput.type = "hidden";
        midInput.name = "mid";
        midInput.value = "Salary68450894545992";

        const orderInput = document.createElement("input");
        orderInput.type = "hidden";
        orderInput.name = "orderId";
        orderInput.value = bodyData.orderId;

        const tokenInput = document.createElement("input");
        tokenInput.type = "hidden";
        tokenInput.name = "txnToken";
        tokenInput.value = bodyData.txnId;

        form.appendChild(midInput);
        form.appendChild(orderInput);
        form.appendChild(tokenInput);

        document.body.appendChild(form);
        form.submit(); // 🚀 REDIRECTS TO PAYTM
      }
      else {
        console.warn("Payment initialization failed:", data.message);
      }
    } catch (error) {
      console.error("Error during PAYTM payment:", error);
    } finally {
      setLoading(false);
      processing = false;
    }
  };

  const handlePAN = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]{0,5}$/.test(value.slice(0, 5)) && /^[\d]{0,4}$/.test(value.slice(5, 9)) && /^[A-Z]{0,1}$/.test(value.slice(9))) {
      setPancard(value);
    }
  };

  const handleOTP = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setOtp(value);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };




  const handlePaymentClick = () => {
    setModalOpen(true);
    document.querySelector(".amountToPay").classList.add("d-none")
    setLoading(false);
  };

  const handleCloseModal = () => {
    document.querySelector(".amountToPay").classList.remove("d-none")
    setModalOpen(false);

  };

  // const handleRazorpay = () => {
  //     setModalOpen(false);
  //     payHere();
  //     setLoading(false);
  // };

  const handlePayU = () => {
    setModalOpen(false);
    payWithPayU();
    setLoading(false);
  };

  const handlePaytm = () => {
    setModalOpen(false);
    payWithPaytm();
    setLoading(false);
  };
  //   const handleBhim = () => {
  //     // Create a JSON object with lead_id and amount
  //     const jsonData = {
  //         lead_id: repaymentData.lead_id,
  //         amount: paymentAmount
  //     };

  //     // Convert the JSON object to a string
  //     const jsonString = JSON.stringify(jsonData);

  //     // Base64 encode the JSON string
  //     const encodedJson = btoa(jsonString); // btoa() encodes a string to base64

  //     // Construct the URL with the encoded JSON
  //     const url = `https://payments.salarytopup.com/?encId=${encodedJson}`;

  //     // Redirect to the encoded URL
  //     window.location.href = url;
  // };



  const handlePaymentAmountChange = (e) => {
    let value = e.target.value;

    // Prevent the value from starting with 0, but allow decimal numbers
    if (value.length === 1 && value === '0') {
      // Do nothing if the input is just "0"
      return;
    }

    // Regex to ensure the input doesn't start with a "0" unless it's "0." (i.e., decimal number like 0.50 is allowed)
    const regex = /^(?!0(\.\d+)?)(\d*\.?\d*)$/;

    // Only update if the value matches the regex pattern
    if (regex.test(value) || value === "") {
      setPaymentAmount(value);
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <PaymentModal
            onClose={handleCloseModal}
            onPayu={handlePayU}
            onPaytm={handlePaytm}
            isLoading={getLoading}
          />
        </>
      )}
      <Helmet>
        <title>Repay Your Loan Online Easily | Salary Top Up</title>
        <meta name="description" content="Find bank details to repay your Salary Top Up loan securely. Use account info or scan QR code for fast, hassle-free repayment. Quick and safe transactions." />
        <meta property="og:title" content="Repay Your Loan Online Easily | Salary Top Up" />
        <meta property="og:description" content="Find bank details to repay your Salary Top Up loan securely. Use account info or scan QR code for fast, hassle-free repayment. Quick and safe transactions." />
        <link rel="canonical" href="https://salarytopup.com/repay-loan" />
      </Helmet>
      <div className="container my-5">
        <h1 className="text-center text-primary mb-4">Repay Loan</h1>
        <div className="text-center mb-3">
          <Link to="/" className="text-decoration-none fw-bold text-warning">
            Home
          </Link>{" "}
          <span className="text-muted">→</span>{" "}
          <span className="fw-semibold">Repay Loan</span>
        </div>



        {/* BANK DETAILS SECTION */}
        <div className="row mt-5">


          <div className="col-md-6 mb-4 d-flex align-self-stretch">
            <div className="p-3  d-flex flex-column">
              <h5 className="mb-3  text-center fs-5 fs-md-4">IndusInd Bank Details</h5>
              {/* <h5 className="mb-3 text-center fs-5 fs-md-4">HDFC Bank Details</h5> */}
              <img
                src={IndusIndQRImage}
                alt="Indus QR"
                className="img-fluid rounded shadow-lg"
                />
              <div className="text-center w-100 d-flex flex-column flex-grow-1 justify-content-center align-items-center">
                {/* <img
                  src={HdfcQRImage}
                  alt="HDFC QR Code"
                  className="img-fluid rounded shadow-lg"
                  style={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "contain" }}
                /> */}
                {/* <p className="mt-3 mb-0 text-muted">Scan this HDFC QR code to pay quickly and securely.</p> */}
                <p className="mt-3 mb-0 text-muted">Scan this IndusInd QR code to pay quickly and securely.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 d-block align-items-stretch">
            <div className="card shadow p-3 w-100 d-flex flex-column">
              <h5 className="mb-3">HDFC Bank Details</h5>
              <table className="table table-sm flex-grow-1">
                <tbody>
                  <tr>
                    <td>Bank Name</td>
                    <td>HDFC Bank</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>Baid Stock Broking Services Pvt Ltd</td>
                  </tr>
                  <tr>
                    <td>Account No</td>
                    <td>99999643336036</td>
                  </tr>
                  <tr>
                    <td>IFSC</td>
                    <td>HDFC0000287</td>
                  </tr>
                  <tr class="d-none">
                    <td>UPI ID</td>
                    <td>Vyapar.174561005002@hdfcbank</td>
                  </tr>
                </tbody>
              </table>
              {/* <img
                src={HDFCQRImage}
                alt="HDFC QR"
                className="img-fluid rounded shadow mt-auto d-none"
                style={{ maxHeight: "600px", objectFit: "contain" }}
              /> */}
            </div>
            <div className="card shadow mt-5 p-3 w-100 d-flex flex-column">
              <h5 className="mb-3">IndusInd Bank Details</h5>
              <table className="table table-sm flex-grow-1">
                <tbody>
                  <tr>
                    <td>Bank Name</td>
                    <td>IndusInd Bank</td>
                  </tr>
                  <tr>
                    <td>Company Name</td>
                    <td>Baid Stock Broking Services Pvt Ltd</td>
                  </tr>
                  <tr>
                    <td>Account No</td>
                    <td>258130930990</td>
                  </tr>
                  <tr>
                    <td>IFSC</td>
                    <td>INDB0001907</td>
                  </tr>
                  <tr>
                    <td>UPI ID</td>
                    <td>Pos.5314125@indus</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* STEP 1: PAN INPUT */}
            {content === "pannumber" && (
              <div className="card shadow mt-5 w-100 p-3 mx-auto">
                <p className="text-muted">
                  Please enter your PAN number to proceed with the loan repayment process.
                </p>
                <div className="mb-3">
                  <label className="form-label fw-semibold">PAN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={getPancard}
                    onChange={handlePAN}
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    required
                  />
                </div>
                <button className="btn btn-primary rounded-0" style={{ margin: 0 }} onClick={sendOtp} disabled={getLoading}>
                  {getLoading ? (
                    <div className="spinner-border spinner-border-sm text-light"></div>
                  ) : (
                    "Get OTP"
                  )}
                </button>
              </div>
            )}

            {/* STEP 2: OTP INPUT */}
            {content === "panotp" && (
              <div className="card shadow w-100 p-3 mx-auto">
                <p className="fw-bold">PAN NUMBER: {getPancard}</p>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={getOtp}
                  onChange={handleOTP}
                  maxLength={4}
                />
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    id="termsCheck"
                  />
                  <label htmlFor="termsCheck" className="form-check-label small">
                    I accept the Terms & Conditions, Privacy Policy and consent to payment processing.
                  </label>
                </div>
                <button
                  className="btn btn-success w-100"
                  onClick={verifyOtp}
                  disabled={!isChecked || getLoading}
                >
                  {getLoading ? (
                    <div className="spinner-border spinner-border-sm text-light"></div>
                  ) : (
                    "Get Amount"
                  )}
                </button>
              </div>
            )}

            {/* STEP 3: SHOW REPAYMENT DETAILS */}
            {content === "amountfetched" && repaymentData && (
              <div className="card shadow w-100 p-3 mx-auto">
                <h4 className="text-center mb-3">Loan Repayment Details</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Loan Number</td>
                      <td>{repaymentData.loan_no}</td>
                    </tr>
                    <tr>
                      <td>Disbursal Date</td>
                      <td>{repaymentData.disbursal_date}</td>
                    </tr>
                    <tr>
                      <td>Repayment Date</td>
                      <td>{repaymentData.repayment_date}</td>
                    </tr>
                    <tr>
                      <td>Repayment Amount</td>
                      <td>₹{repaymentData.repayment_amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Loan Amount</td>
                      <td>₹{repaymentData.loan_recommended.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Interest</td>
                      <td>₹{repaymentData.real_interest.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Total Due</td>
                      <td className="fw-bold text-danger">
                        ₹{repaymentData.total_due_amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="amountToPay">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Amount To Pay</label>
                    <input
                      type="text"
                      className="form-control"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter payment amount"
                    />
                  </div>

                  <div className="repayment-button-container">
                    <button className="repayment-button w-100" onClick={handlePaymentClick}>
                      {getLoading ? <div className="loadinganim"></div> : "Proceed to Pay"}
                    </button>
                  </div>
                </div>


              </div>
            )}

            {/* STEP 4: PAYMENT SUCCESS */}
            {content === "paymentSuccess" && (
              <div className="alert alert-success text-center">
                <h4>{paymentStatus}</h4>
                <p>Thank you for your payment!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default RepayLoan;