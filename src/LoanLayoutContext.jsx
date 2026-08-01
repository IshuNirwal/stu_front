import React, { useState } from 'react'
import ContextDashboard from './Context/ContextDashboard';
import Alert from './components/ui/Alert';
import { useNavigate } from 'react-router-dom';
import { getStorage } from './Utils/common';
import { getDashboardData } from './Utils/api';


function LoanLayoutContext({children}) {
    const [profileData, setProfileData] = useState({});
    const [outdata, setOutData] = useState({});
    const [message, setMessage] = useState({});
    const [eligibilityStatus, setEligibilityStatus] = useState({});
    const [usertype, setUserType] = useState({});
    const [loader,setLoader] = useState(false);
    const [setps, setSetps] = useState({});
    const navigate = useNavigate();
    const LOGIN = "login";
    const PANCARD = "pancard_verification";
    const PERSONAL_DETAILS = "personal_details";
    const RESIDENCE_DETAILS = "residence_details";
    const INCOME_DETAILS = "income_details";
    const SELFIE_UPLOAD = "selfie_upload";
    const REGISTER_NOW = "register_now";
    const GENERATE_LOAN_QUOTE = "generate_loan_quote";
    const EMPLOYMENT_DETAILS = "employment_details";
    const BANK_STATEMENT_UPLOAD = "bank_statement_upload";
    const PAY_SLIP_UPLOAD = "pay_slip_upload";
    const PANCARD_UPLOAD = "pan_upload";
    const LOAN_QUOTATION_DECISION = "loan_quotation_decision";
    const AADHAR_UPLOAD = "aadhaar_upload";
    const RESIDENCE_PROOF = "residence_proof_upload";
    const BANKING_DETAILS = "banking_details";
    const COMPLETED = "completed";

    // Handle navigation based on event name
    const handleEvent = (eventName) => {
        switch (eventName) {
            case LOGIN:
                navigate("/apply-now");
                break;
            case PANCARD:
                navigate("/my-dashboard/pan-details");
                break;
            case PERSONAL_DETAILS:
                navigate("/my-dashboard/captur-personal-information");
                break;
            case RESIDENCE_DETAILS:
                navigate("/my-dashboard/captur-address");
                break;
            case INCOME_DETAILS:
                navigate("/my-dashboard/captur-income-details");
                break;
            case SELFIE_UPLOAD:
                navigate("/my-dashboard/upload-picture");
                break;
            case REGISTER_NOW:
                navigate("/my-dashboard/profile-preview");
                break;
            case GENERATE_LOAN_QUOTE:
                navigate("/my-dashboard/calculate-loan");
                break;
            case EMPLOYMENT_DETAILS:
                navigate("/my-dashboard/about-your-company");
                break;
            case LOAN_QUOTATION_DECISION:
                navigate("/my-dashboard/calculate-loan");
                break;
            case BANK_STATEMENT_UPLOAD:
                navigate("/my-dashboard/adhar-upload");
                break;
            case PAY_SLIP_UPLOAD:
                navigate("/my-dashboard/adhar-upload");
                break;
            case PANCARD_UPLOAD:
                navigate("/my-dashboard/adhar-upload");
                break;
            case AADHAR_UPLOAD:
                navigate("/my-dashboard/adhar-upload");
                break;
            case RESIDENCE_PROOF:
                navigate("/my-dashboard/adhar-upload");
                break;
            case BANKING_DETAILS:
                navigate("/my-dashboard/bank-detail");
                break;
            case COMPLETED:
                navigate("/my-dashboard/congratulations");
                break;
            default:
                navigate("/apply-now");
        }
    };

    // Get the current event value based on event name
    const currentEvent = (eventName) => {
        switch (eventName) {
            case PANCARD:
                return 0;
            case PERSONAL_DETAILS:
                return 1;
            case RESIDENCE_DETAILS:
                return 2;
            case INCOME_DETAILS:
                return 3;
            case SELFIE_UPLOAD:
                return 4;
            case REGISTER_NOW:
                return 8;
            case GENERATE_LOAN_QUOTE:
                return 9;
            case LOAN_QUOTATION_DECISION:
                return 9;
            case EMPLOYMENT_DETAILS:
                return 10;
            case BANK_STATEMENT_UPLOAD:
                return 11;
            case AADHAR_UPLOAD:
                return 11;
            case RESIDENCE_PROOF:
                return 11;
            case PANCARD_UPLOAD:
                return 11;
            case PAY_SLIP_UPLOAD:
                return 11;
            case BANKING_DETAILS:
                return 12;
            case COMPLETED:
                return 13;
            default:
                return 0;
        }
    };

    const logout = () =>{
      sessionStorage.clear(); 
      navigate('/apply-now');
    }
    // const getProfileDaital = ()=>{

    //   const params ={
    //     lead_id:getStorage("lead_id") || "",
    //     mobile:getStorage("mobile") || "",
    //     token:getStorage("token") || "",
    //   }
    //   setLoader(true)
    //   getDashboardData(params).then((resp)=>{
    //     setLoader(false)
    //         if(resp?.data?.Status === 1){
    //           setSetps(resp?.data?.Steps?.steps);
    //          const  profileData = resp?.data?.Steps?.data || {};
    //          const repaymentData = resp?.data?.Steps?.outstanding || {};
             
    //           setProfileData(profileData)
    //           setOutData(repaymentData)
    //           setEligibilityStatus(resp?.data?.Steps?.steps?.eligibility_status)
    //           setUserType(resp?.data?.Steps?.data.user_type)
            
    //         }else if(resp?.data?.Status === 4){
    //           logout();
    //         }else{
    //           let msg = "";
    //           if(resp?.data?.Message){
    //             msg = resp?.data?.Message;
    //           }else{
    //             msg = resp?.data?.error;
    //           }
    //             setMessage({ type: 'error', msg: msg, });
    //         }
    //   })
    // }
  
  return (
    <ContextDashboard.Provider value={{setMessage,message ,logout,setProfileData,setOutData,outdata,setps,setSetps,eligibilityStatus,usertype,setUserType,loader,handleEvent,currentEvent}}>
      <Alert setMessage={setMessage} message={message}  />
    {children}
</ContextDashboard.Provider>
  )
}

export default LoanLayoutContext;