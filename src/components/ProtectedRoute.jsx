import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStorage } from '../Utils/common';


const ProtectedRoute = ({ redirectTo, element }) => {
  const [eligibilityStatus, setEligibilityStatus] = useState(getStorage("eligibility"));
  const location = useLocation();
  if (eligibilityStatus === 1) {
    return element;
  }
  return <Navigate to={redirectTo} state={{ from: location }} />;
};

export default ProtectedRoute;
