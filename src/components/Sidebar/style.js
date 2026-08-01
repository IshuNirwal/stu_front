import styled from "styled-components";

export const SidebarWrapper = styled.div`
  width: 232px;
  min-width: 232px;
  position: absolute;
  top: 0px;
  left: 0px;
  padding-right: 20px;
  background: #F9F9F9;
  z-index: 11;
  bottom: 0;
  transition: all .3s;
ul{
    li{
        background: #1e50a2 0% 0% no-repeat padding-box;
         border-radius: 10px;
         display: flex;
         gap: 8px;
         align-items: center;
         height: 45px;
         padding: 13px;
         color: #ffff;
         margin-bottom: 10px;
         border: 1px solid transparent;
         transition: all .3s;
         span{
            display: block;
            font-size: 15px;
            font-weight: 600;
            width: 100%;
            visibility: visible;
            opacity: 1;
            white-space: nowrap;
         }
         &:hover{
            box-shadow: 0px 1px 2px #00000017;
border: 1px solid #26B9DB;
         }
         &.active{
          background-color: #26b9db;
          color: #fff;
          img{
            
          }
         }
    }
}

&.close{
   min-width: 80px;
   width: 80px;
   overflow: hidden;
   transition: all .3s;
   ul li {
    justify-content: center;
    span{
      visibility: hidden;
      opacity: 0;
      display: none;
    
   }
   }
   @media only screen and (max-width: 768px)  {

   min-width: 232px;
   width: 232px;
   left: -244px;
   overflow: hidden;
   ul li {
  justify-content: start;
    span{
    display: block;
   }
 
}
}
}

`;