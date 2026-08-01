import React from "react";
import { ProgressBarWrapper, ProgressBoxWrapper } from "./style";

function ProgressBar({children,value="0%", title="Profile Registration"}) {
  return (
    <ProgressBarWrapper>
      <div className="flex">
        <h2>{title}</h2>
         <ProgressBarBox value={value} />
         {children}
      </div>
      <p>Register now to explore a range of tailored services just for you. Once registered, our loan service will be available to meet your financial needs.</p>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

export function ProgressBarBox({value}) {
  return (
    <ProgressBoxWrapper className="progress">
      <div className="progress-bar" style={{ width: value }}>{value}</div>
    </ProgressBoxWrapper>
  );
}
