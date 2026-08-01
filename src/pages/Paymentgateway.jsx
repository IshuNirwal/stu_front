import React, { useState } from "react";

const Paymentgateway = () => {
  const [processingHDFC, setProcessingHDFC] = useState(false);
  const [processingPAYTM, setProcessingPAYTM] = useState(false);





  const payWithPayHdfc = async () => {
    if (processingHDFC) return; // prevent double-click
    setProcessingHDFC(true);

    try {
      // const total_due_amount = 6050;
      const lead_id = 14;

      const response = await fetch("https://salarytopup.in/api/post_payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // amount: total_due_amountl,
          lead_id: lead_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      data = JSON.parse(data)
      console.log(data)

      if (data.status === "NEW") {
        const paymentUrl = data.payment_links.web;
        if (!paymentUrl) {
          throw new Error("Payment URL not found in the response.");
        }
        window.location.href = paymentUrl;
      } else {
        console.warn("Payment initialization failed:", data.message);
      }
    } catch (error) {
      console.error("Error during HDFC payment:", error);
    } finally {
      setProcessingHDFC(false);
    }
  };




  /* ---------------- INVOKE PAYTM CHECKOUT ---------------- */
const payWithPayPaytm = async () => {
    if (processingPAYTM) return; // prevent double-click
    setProcessingPAYTM(true);

    try {
      // const total_due_amount = 6050;
      const lead_id = 14;

      const response = await fetch("https://salarytopup.in/api/post_payment/initialize_paytm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // amount: total_ due_amountl,
          lead_id: lead_id,
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
          "https://securestage.paytmpayments.com/theia/api/v1/showPaymentPage" +
          `?mid=yCFIFF10018060868732&orderId=${bodyData.orderId}`;

        const midInput = document.createElement("input");
        midInput.type = "hidden";
        midInput.name = "mid";
        midInput.value = "yCFIFF10018060868732";

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
      setProcessingPAYTM(false);
    }
  };



  return (
    <>
      <button
        className="btn btn-primary my-5 px-5 rounded-0"
        onClick={payWithPayHdfc}
        disabled={processingHDFC}
      >
        {processingHDFC ? "Processing..." : "Pay Now HDFC"}
      </button>

      <button
        className="btn btn-primary my-5 px-5 rounded-0"
        onClick={payWithPayPaytm}
        disabled={processingPAYTM}
      >
        {processingPAYTM ? "Processing..." : "Pay Now PAYTM"}
      </button>
    </>
  );

};

export default Paymentgateway;
