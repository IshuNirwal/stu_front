import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

const LoanCalculator = () => {
  const [baseamount, setBaseAmount] = useState(5000);
  const [tenure, setTenure] = useState(1); 
  const [interestRate, setInterestRate] = useState(0.25); 
  const [repayableAmount, setRepayableAmount] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [processingFee, setProcessingFee] = useState(0); 
  const [apr, setApr] = useState(0); 

  useEffect(() => {

    const calculatedInterest = (baseamount * interestRate * 30) / 100; 
    const calculatedInterest1 = (baseamount * interestRate * tenure) / 100; 
    const calculatedTotalAmount1 = Number(baseamount) + calculatedInterest1;

    // Assuming processing fee is 2% of the base amount
    const fee = (baseamount * 0.1); // Processing fee is 2% of the principal

    // APR calculation using the new formula: 
    // apr = ((processing_fee + total_interest) / principal) * (365 / n_days) * 100
    const totalInterest = calculatedInterest;
    const nDays = 30; // tenure represents the number of days
    const aprCalculation = ((fee + totalInterest) / baseamount) * (365 / nDays) * 100; // New APR calculation

    setInterest(calculatedInterest1);
    setTotalAmount(calculatedTotalAmount1); // Total amount including processing fee
    setProcessingFee(fee);
    setApr(aprCalculation); // Set APR value dynamically
  }, [baseamount, tenure, interestRate]); // Add baseamount, tenure, and interestRate as dependencies

  const getSliderBackground = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--theme-color) ${percentage}%, #bbb9b9 ${percentage}%)`;
  };

  return (
    <>
      <div className="loan_calculator">
        <h2>Loan Calculator</h2>
        <div className="input_field_container">
          <div className="item_title">
            <h4 className="mb10">Amount</h4>
          </div>
          <div className="illustrative_values flex flex-center space-between">
            <p>5K</p>
            <p>1L</p>
          </div>
          <div className="input_item flex flex-center">
            <input
              type="range"
              value={baseamount}
              step={500}
              min="5000"
              max="100000"
              onChange={(e) => setBaseAmount(e.target.value)}
              style={{ background: getSliderBackground(baseamount, 5000, 100000) }} // Apply dynamic background
            />
            <div className="amount ml10">
              <span className="data_values">{baseamount}</span>
            </div>
          </div>
          <div className="item_title">
            <h4 className="mb10">Period</h4>
          </div>
          <div className="illustrative_values flex flex-center space-between">
            <p>1 Day</p>
            <p>40 Days</p>
          </div>
          <div className="input_item flex flex-center">
            <input
              type="range"
              min="1"
              max="40"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              style={{ background: getSliderBackground(tenure, 1, 40) }} // Apply dynamic background
            />
            <div className="amount ml10">
              <span className="data_values">{tenure}</span>
            </div>
          </div>
          <div className="item_title">
            <h4 className="mb10">Interest Rate</h4>
          </div>
          <div className="illustrative_values flex flex-center space-between">
            <p>0.25%</p>
            <p>1%</p>
          </div>
          <div className="input_item flex flex-center">
            <input
              type="range"
              min="0.25"
              max="1"
              step="0.25" // Set step to 0.25
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              style={{ background: getSliderBackground(interestRate, 0.25, 1) }} // Apply dynamic background
            />
            <div className="amount ml10">
              <span className="data_values">{interestRate}%</span>
            </div>
          </div>
          <div className="input_item mt20 loan_amount_display_container">
          <p>
              You have to pay &nbsp;
              <b>
                <FaRupeeSign className="rupee_icon" />
                {totalAmount.toFixed(2)}
              </b>
            </p>
            <p>
              Processing Fee: &nbsp;
              <b>
                <FaRupeeSign className="rupee_icon" />
               10%
              </b>
            </p>
            <p>
              APR: &nbsp;
              <b>{apr.toFixed(2)}%</b>
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculator;
