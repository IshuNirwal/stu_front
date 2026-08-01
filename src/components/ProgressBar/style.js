import styled from "styled-components";


export const ProgressBarWrapper = styled.div`
background: beige 0% 0% no-repeat padding-box;
padding: 2px;
border-radius: 15px;

&>div{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 2px #00000014;
   border-radius: 13px;
   padding: 18px;
   gap: 16px;
   align-items: center;
   h2{
    font-size: 20px;
    color: #000;
    white-space: nowrap;
}

}
p{
    font-size: 15px;
    text-align: center;
    color: #000;
    padding: 12px 12px 10px;
}

@media only screen and (max-width: 768px){
  p{
      font-size: 12px;
      line-height: 14px;
    }
  &>div{
    flex-direction: column;
    align-items: start;
    position: relative;
    h2{
      font-size: 15px;
      
    }
  }
        }



`;

export const ProgressBoxWrapper = styled.div`

  width: 100%;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  height: 25px;
  .progress-bar {
  height: 100%;
  background-color: #5cb85c; /* Success color */
  text-align: center;
  line-height: 25px; /* Vertically center the text */
  color: white;
  font-weight: bold;
  white-space: nowrap; /* Prevent text from wrapping */
  transition: width 0.6s ease; /* Smooth width transition */
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 30px 30px;
  animation: progress-bar-stripes 1s linear infinite;

}





@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
`;


