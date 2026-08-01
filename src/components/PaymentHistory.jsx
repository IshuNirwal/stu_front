import React, { useEffect, useState } from 'react';
import '../css/paymenthistory.css';
import { getPaymentHistory } from '../Utils/api';
import { useLocation } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

export default function PaymentHistory() {

    const location = useLocation();
    const { leadId } = location.state || {};
    const [paymentData,setPaymentData]=useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (typeof date !== 'object' || isNaN(date.getTime())) {
            return '-';
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    useEffect(()=>{

    const fetchRepayData = async () => {
            const params = {
                leadId: leadId,
            };

            try {
                const response = await getPaymentHistory(params);
                if (response?.data?.status === 1) {
                    const leadDetails = response?.data?.data;
                    setPaymentData(leadDetails);

                } else {
                    console.warn('Lead detail generation failed:', response);
                }
            } catch (error) {
                console.error('Error generating lead detail:', error);
            }
        };

        fetchRepayData()

        },[])


    return (
        <>
            <div className='table-container'>
                <table>
                    <thead >
                    <tr>
                        <th>Loan No</th>
                        <th>Received Date</th>
                        <th>Received Amount</th>
                        <th>Refrence No</th>
                        <th>Payment Mode</th>
                        <th>Repayment Type</th>
                        <th>Payment Status</th>
                       
                    </tr>
                </thead>
                    <tbody>
                        {paymentData.map((item,index)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.loan_no}</td>
                                    <td className="amount">{formatDate(item.date_of_recived)}</td>
                                    <td className="amount">{item.received_amount}</td>
                                    <td className="amount">{item.refrence_no}</td>
                                    <td className="amount">{item.payment_mode}</td>
                                    <td><span className="status-badge status-paid">{item.repayment_type}</span></td>
                                    <td>
                                        {item.payment_status?.toLowerCase() === "approved" ? (
                                            <span className="paid-checkmark" style={{ color: "green" }}>
                                            <CheckCircleIcon />
                                            </span>
                                        ) : (
                                            <span className="pending-icon" style={{ color: "orange" }}>
                                            <PendingIcon />
                                            </span>
                                        )}
                                        </td>

                                </tr>
                            )
                        })}
                        
                        
                    
                    </tbody>
                </table>
            </div>
        </>
    )
}
