import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    input, input:focus, textarea, textarea:focus {
        outline: none;
    }

    table {
        border-collapse: collapse;
        text-align: left;
        overflow-x: scroll !important;
    }

    .flex {
        display: flex;
    }

    .flex-wrap {
        flex-wrap:wrap
    }

    .flex-center {
        align-items: center;
    }

    .justify-center {
        justify-content: center;
    }

    .justify-end {
        justify-content: flex-end;
    }

    .space-between {
        justify-content: space-between;
    }

    .space-evenly {
        justify-content: space-evenly;
    }

    .gap4{
        gap: 4px;
    }
    .center{
   display: flex;
   justify-content: center;
   align-items: center;
    }
    .pointer{
        cursor: pointer;
    }
    .ml10 {
        margin-left: 10px;
    }

    .ml20 {
        margin-left: 20px
    }

    .ml30 {
        margin-left: 30px;
    }

    .ml40 {
        margin-left: 40px;
    }

    .ml50 {
        margin-left: 50px
    }

    .ml60 {
        margin-left: 60px;
    }

    .ml70 {
        margin-left: 70px;
    }

    .ml90 {
        margin-left: 90px;
    }

    .mt6 {
        margin-top: 6px;
    }

    .mt10 {
        margin-top: 10px;
    }

    .mt15 {
        margin-top: 15px;
    }

    .mt20 {
        margin-top: 20px
    }

    .mt30 {
        margin-top: 30px;
    }

    .mt40 {
        margin-top: 40px;
    }

    .mt50 {
        margin-top: 50px
    }

    .mt60 {
        margin-top: 60px;
    }

    .mt90 {
        margin-top: 90px;
    }

    .mb10 {
        margin-bottom: 10px;
    }

    .mb15 {
        margin-bottom: 15px;
    }

    .mb20 {
        margin-bottom: 20px;
    }

    .mb30 {
        margin-bottom: 30px;
    }

    .mb40 {
        margin-bottom: 40px;
    }
    
    .mb50 {
        margin-bottom: 50px;
    }

    .mb60 {
        margin-bottom: 60px;
    }

    .mr5 {
        margin-right: 5px;
    }

    .mr10 {
        margin-right: 10px;
    }

    .mr20 {
        margin-right: 20px;
    }

    .mr30 {
        margin-right: 30px;
    }

    .mr40 {
        margin-right: 40px;
    }
    
    .mr50 {
        margin-right: 50px;
    }
    
    .mr60 {
        margin-right: 60px;
    }

    .p12 {
        padding: 12px;
    }

    .p16 {
        padding: 16px;
    }

    .p20 {
        padding: 20px;
    }

    .p24 {
        padding: 24px;
    }

    .p28 {
        padding: 28px;
    }

    .p32 {
        padding: 32px;
    }

    .pt10 {
        padding-top: 10px;
    }

    .pt20 {
        padding-top: 20px;
    }

    .pt30 {
        padding-top: 30px;
    }

    .pt40 {
        padding-top: 40px;
    }

    .pt50 {
        padding-top: 50px;
    }

    .pt60 {
        padding-top: 60px;
    }

    .pt90 {
        padding-top: 90px;
    }
    .pl10 {
        padding-left: 10px;
    }

    .pl20 {
        padding-left: 20px;
    }

    .pl30 {
        padding-left: 30px;
    }

    .pl40 {
        padding-left: 40px;
    }

    .pl50 {
        padding-left: 50px;
    }

    .pl60 {
        padding-left: 60px;
    }

    .pr10 {
        padding-right: 10px;
    }

    .pr20 {
        padding-right: 20px;
    }

    .pr30 {
        padding-right: 30px;
    }

    .pr40 {
        padding-right: 40px;
    }

    .pr50 {
        padding-right: 50px;
    }

    .pr60 {
        padding-right: 60px;
    }

    .pb10 {
        padding-bottom: 10px;
    }

    .pb20 {
        padding-bottom: 20px;
    }

    .pb30 {
        padding-bottom: 30px;
    }

    .pb40 {
        padding-bottom: 40px;
    }

    .pb50 {
        padding-bottom: 50px;
    }

    .pb60 {
        padding-bottom: 60px;
    }

    .full-width {
        max-width: 2020px;
        margin-inline: auto;
        width: 100%;
    }

    .full-page-height {
        min-height: 100vh;
    }

    .gap {
        gap: 20px;
    }

    .gap_30 {
        gap: 30px;
    }
    
  table {
    border-collapse: collapse;
    text-align: left;
    overflow-x: scroll !important;
  }

  th {
    padding: 0.5rem 1rem;
    letter-spacing: 0.1rem;
    font-size: 0.8rem;
    font-weight: 700;
  }

  td {
    padding: 0.8rem 1.1rem;
    font-size: 0.89rem;
  }

  table td a {
    text-decoration: none;
    cursor: pointer;
  }

  .text-center {
    text-align: center;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-start {
    justify-content: flex-start;
  }
  .dashboardMain{
    .mainPage{
    gap: 4px;
    flex: 1 1 100%;
    width: 100%;
    margin-left: 236px;
    transition: margin-left .3s;
    &.close{
        margin-left: 84px; 
      
    }
  
}
.mainBox{
    gap: 24px;
    min-height: 580px;
    
    position: relative;
}
  }



  @media only screen and (max-width: 768px){
          .dashboardMain{
            .mainPage{
                margin-left : 0;
                &.close{
                    margin-left: 0; 
                }
            }
          }
        }

`;

export default GlobalStyle;




export const BoxWrapper = styled.div`

background: #F9F9F9 ;
box-shadow: 0px 1px 2px #00000014;
border-radius: 15px;
padding: 42px 32px;
margin-bottom: 40px;

&.w100{
    width: 100%;
    min-height: 400px;
}
&.gray{
    // background: #dcf0ff;
}
.formmainBox{
    .left{
        padding-right: 60px;
        img{
            width: 13px;
        }
        span{
            font-size: 15px;
            color: #082654;
        }
    }
    .right{
       h2{
        font-size: 25px;
        color: #082654;
        line-height: 30px;
       }
       p{
        font-size: 15px;
        line-height: 21px;
       }

    }
}
@media only screen and (max-width: 768px){
    padding: 20px 20px;
    &.centerBox{
        .formmainBox{
            align-items: center;
        }
    }
    .formmainBox{
        flex-direction: column;
        align-items: flex-start;

        .left{
            margin-bottom: 10px;
            padding-right: 0;
        }
        .right{
            width: 100%;
        }
    }
}
`;
