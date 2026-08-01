import React from "react";
import { Route, Routes,Navigate  } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollTop";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ApplyForLoan from "./pages/ApplyForLoan";
import FAQ from "./pages/FAQ";
import RateandTerms from "./pages/RateandTerms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandConditions";

import RepayLoan from "./pages/RepayLoan";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";


import RepayThankyou from "./pages/RepayThanku";
import NotFound from "./pages/404";
import BlogAll from "./components/Blog/BlogAll";
import BlogDetail from "./components/Blog/BlogDetail";
import Paymentgateway from "./pages/Paymentgateway";
import Layout1 from "./Layout1";
import NewDashboard from "./pages/journey-pages/NewDashboard";
import ApplicationStep from "./pages/journey-pages/ApplicationStep";
import Thankyou from "./pages/journey-pages/Thankyou";
import NotEligible from "./pages/journey-pages/NotEligible";
import Dashboard from "./pages/journey-pages/Dashboard";
import LoanDetails from "./pages/journey-pages/LoanDetails";
import Support from "./pages/journey-pages/Support";
import UserProfile from "./pages/journey-pages/UserProfile";
import LoanHistory from "./pages/journey-pages/LoanHistory";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

const showmessage = async (message) => {
  try {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

function Router() {
  return (
    <>
    <Provider store={store}>
      {/* Global Toast Container */}
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="global-toast"
      /> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="rate-and-terms" element={<RateandTerms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsandConditions />} />
          <Route path="thanku" element={<RepayThankyou/>}/>
          <Route path="apply-now" element={<ApplyForLoan showmessage={showmessage} />} />
          <Route path="repayloan" element={<Navigate to="/repay-loan" replace />} />
          <Route path="repay-loan" element={<RepayLoan showmessage={showmessage} />} />
          <Route path="blog" element={<BlogAll />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/paymenthdfc" element={<Paymentgateway />} />
          </Route>

          <Route path='/' element={<Layout1 />}>
          <Route path="/journey" element={<NewDashboard />} />
          <Route path="/journey/application" element={<ApplicationStep />} />
          <Route path='/journey/congratulations' element={<Thankyou />} />
          <Route path="/journey/not-eligible" element={<NotEligible />} />
          <Route path='/journey/dashboard' element={<Dashboard />}></Route>
          <Route path='/journey/loan-detail' element={<LoanDetails />}></Route>
          

          <Route path='/journey/support-detail' element={<Support />} />
          <Route path='/journey/user-profile' element={<UserProfile />} />
          <Route path='/journey/loan-history' element={<LoanHistory/>} />
          </Route>


        

        
       
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Provider>
    </>
  );
}

export default Router;



