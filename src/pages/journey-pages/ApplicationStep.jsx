import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoanCalculation from './LoanCalculation';
import PersonalDetails from './PersonalDetails';
import UploadDocument from './UploadDocument';
import BankDetails from './BankDetails';
import Ekyc from './Ekyc';
import AccountAggregator from './AccountAggregator';
import AggregatorVerify from './AggregatorVerify';
import AutoLoanOffer from './auto-journey/AutoLoanOffer';

export default function ApplicationStep() {
    const { loan_quote, ekyc_detail, personal_details, upload_documents, banking_details,account_aggregator,aggregator_verify } = useSelector(
        (state) => state?.customerJourneyDetails?.journeySteps
    );
    const navigate = useNavigate();
    const customerDetails = useSelector(
        (state) => state.customerJourneyDetails.customerDetails
    );
    const isAuto=customerDetails?.isAuto;

    // Redirect when all steps are completed
    useEffect(() => {

        if (customerDetails?.user_type == 'REPEAT') {
            if (
                loan_quote === 1 &&
                ekyc_detail === 1 &&
                personal_details === 1 &&
                upload_documents === 1 &&
                banking_details === 1
            ) {
                navigate('/journey/congratulations');
            }
        }else if (isAuto && loan_quote === 1 && ekyc_detail === 1 && personal_details === 1 && banking_details === 1) {
            navigate('/journey/congratulations');
        }
        else if (loan_quote === 1 &&
            ekyc_detail === 1 &&
            personal_details === 1 &&
            upload_documents === 1 &&
            banking_details === 0) {
            navigate('/journey/congratulations')
        }
    }, [loan_quote, ekyc_detail, personal_details, upload_documents, banking_details]);


    let content = null;
    if (loan_quote === 2) {
        if(!isAuto){
        content = <LoanCalculation />
        }else{
            content=<AutoLoanOffer/>
        }
    }else if(ekyc_detail===2){
        content=<Ekyc />
    }
     else if (personal_details === 2) {
        content = <PersonalDetails />;
    }else if (account_aggregator === 2) {
        content = <AccountAggregator />;
    }
    else if (aggregator_verify === 2) {
        content = <AggregatorVerify />;
    }
    else if (upload_documents === 2) {
        content = <UploadDocument />;
    } else if (banking_details === 2) {
        content = <BankDetails />
    }

    return (
        <div>
            {content}
        </div>
    );
}
