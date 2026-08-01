import React from 'react';

import { RadioButtonConfirmWrapper } from './style';

const RadioButtonConfirm = ({ label="", name="", checked=false,error="" ,onChange=()=>{} }) => {
  return (
    <RadioButtonConfirmWrapper>
   <label className="container">
      <p>{label}</p>
      <input
        type="radio"
        name={name}
        checked={checked}
        onClick={onChange}
      />
      <span className="checkmark" style={{border:"1px solid black"}}></span>
    </label>
    {(error !=="")&&<div className="error">
       {error}
    </div>}
    </RadioButtonConfirmWrapper>
    
  );
};

export default RadioButtonConfirm;
