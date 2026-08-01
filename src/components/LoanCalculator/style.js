import styled from "styled-components";

import banner from "../../images/3.webp";
export  const LoanCalculatorWrapper = styled.div`
margin-top: 20px;
&>div{
    flex: 1 1 45%;
    gap: 40px;
}
.left{
    display: flex;
    background: url(${banner});
    margin-left: -110px;
    margin-right: 20px;
    padding: 20px;
    color: #fff;
    background-position: center;
    border-radius: 15px;
    &>div{
        align-self: flex-end;
    }
    .img{

        img{
           width: 100%!important;
        }
    }
}

.selectLoanPurpose{
  padding: 11px !important;
  height: 40px !important;
}
.right{
    display: flex;
    flex-direction: column;
    gap: 10px;

    .box{
        padding: 23px 25px;
background:#225594;
box-shadow: 0px 1px 2px #00000014;
border-radius: 15px;
min-height: 100px;
color: #fff;
        h2{
            color: #fff;
        margin-bottom: 10px;
        }
        &>div{
            gap: 12px;
            .value{
              font-size: 20px;
              font-weight: 600;
            }
        }
    }
    .cards-cal{
        display: flex;
        gap: 10px;
      .card-cal{
      background: #fff;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      flex: 1 1 30%;
      img{
        height: 40px;
        text-align: center;
      
        margin-bottom: 10px;
      }
      h3{
        font-size: 13px;
      }
      h2{
        font-size: 15px;
      }
      }
    }
}

@media only screen and (max-width: 768px){
  .left{
    display: none;
  }
  .right{
  margin-inline: auto;
  }
}

`;