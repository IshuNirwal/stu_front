
const urls = {
   // get BASE_IMAGE_URL() {
   //    if (window.location.href.includes("staging.salarytopup.com")) return 'https://baidstock.s3.ap-south-1.amazonaws.com/upload/';
   //    if (window.location.href.includes("https://salarytopup.com")) return 'https://baidstock.s3.ap-south-1.amazonaws.com/upload/';
   //    if (window.location.href.includes("https://www.salarytopup.com")) return 'https://baidstock.s3.ap-south-1.amazonaws.com/upload/';
   //    return 'http://localhost/salarytopup/upload/';
   // },
   // get API_BASEPATH() {
   //    if (window.location.href.includes("staging.salarytopup.com")) return 'https://staging.salarytopup.in/api';
   //    if (window.location.href.includes("https://salarytopup.com")) return 'https://salarytopup.in/api';
   //    if (window.location.href.includes("https://www.salarytopup.com")) return 'https://salarytopup.in/api';
   //    return 'http://localhost:8000/salarytopup/api';
   // },
   get BASE_IMAGE_URL() {
     
      return 'https://baidstock.s3.ap-south-1.amazonaws.com/upload/';
   },
   API_BASEPATH: "https://salarytopup.in/api",
   BASE_API_URL:" https://staging.salarytopup.in/node-api/api/v1/",
   LMS_API_URL : 'https://staging.salarytopup.in/api/Api/',
    loan:{
      
       USER_DATA:"/Api/Website/getUser",
      
       GENERATE_ORDER_ID:"/Api/Website/InstantJourneyController/generateRazorpayorderId",
       
       ALL_BLOGS:"/Api/Website/BlogsController/blog",
       BLOG_DETAILS:"/Api/Website/BlogsController/blogDetail",
      LOGIN:'customer-journey/login',
      OTP_VERIFY:"customer-journey/otp-verify", 
      RESEND_OTP:"customer-journey/resend-otp",
      CUSTOMER_DETAILS: "lead-service/get-customer-details",
      PAN_VERIFICATION:"customer-journey/verify-pan",
      ELIGIBILITY_CHECK:"customer-journey/check-eligibility",
      LOAN_QUOTE:"lead-service/loan-quote-decision",
      LOAN_GENERATE:"lead-service/generate-loan-quote",
      DETAILS_PERSONAL:"customer-journey/update-personal-details",
      EMPLOYMENT_DETAILS:"customer-journey/update-employment-details",
      REQUIRED_DOCS:"lead-service/required-docs",
      UPLOAD_DOCS:"lead-service/pay-slip-upload",
      BANK_VERIFY:"lead-service/bank-account-verification",
      LEAD_LIST:"lead-service/get-status-lead-list",
      LEAD_DETAIL:"lead-service/get-lead-view-detail",
      RAZORPAY_ORDER_ID:"razor-pay/create-payment-order",
      MASTER_DATA:"lead-service/get-master-docs",
      PAYMENT_HISTORY:"lead-service/get-repayment-history",
      REDIRECT_TO_JOURNEY: "lead-service/redirect-to-journey",
      GET_CAPTCHA:"/index.php/Api/EnquiryController/generate_captcha",
      ENQUIRY:"/Api/EnquiryController/enquire",
      EKYc_DETAIL:"lead-service/initiate-ekyc",
      EKYC_RESPONSE:  "Website/RepeatInstantJourneyController/verifyEkyc",
      ACCOUNT_AGGREGATOR:'lead-service/account-aggregator-initiate',
      AGGREGATOR_RESPONSE:  "Website/RepeatInstantJourneyController/verifyAggregator",
    }
}

export default urls;