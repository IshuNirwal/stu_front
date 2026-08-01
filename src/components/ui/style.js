import styled from "styled-components";


export const InputWrapper = styled.div`

width: 100%;
flex: 1 1 50%;
font-family: "Lato", sans-serif;
  .inputField{
   
position: relative;

.icon{
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

label{
    text-align: left;
    font-size: 13px;
    font-weight: 600;
letter-spacing: 0px;
color: #000000;
    display: block;
    text-align: start;
    position: absolute;
    top: 0%;
    transform: translateY(-50%);
    left: 10px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    padding: 0 4px;
    z-index: 1;
}
.react-datepicker-wrapper{
  width: 100%;
}
input,
select{
  
    font-size: 13px;
    font-weight: 500;
    height: 50px;
    border: none;
    width: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 1px 2px #00000017;
/* border: 1px solid #E1E1E1; */
border-radius: 5px;
    outline: 1px solid #E1E1E1;
    padding: 21px 16px 14px;
    &:focus{
        border: none;
        outline: 1px solid #E1E1E1;
        background-color: none;
    }
    &:focus-visible{
        border: none;
    }
}
&.focus{
    /* border: 1px solid #1A4F43; */
}
.toggel{
    position: absolute;
    right: 10px;
    bottom: 10px;
}
  }
  .error{
    color: #FF0000;
    background-color: #FFE9E9;
    padding: 4px 10px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;

    width: 100%;
  }
`


export const RadioButtonConfirmWrapper = styled.div`
margin-bottom: 20px;
.container {
  display: block;
  position: relative;
  padding-left: 35px;

  cursor: pointer;
  font-size: 10px;
  user-select: none;
  p{
    font-size: 10px;
    line-height: 14px;
    margin-bottom: 0!important;
  }
  input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
}




.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 50%;
}


.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}


.container .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}


  .error{
    color: #FF0000;
    background-color: #FFE9E9;
    padding: 4px 10px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;

    width: 100%;
  }

`



export const AlertWrapper = styled.div`
    padding: 10px 25px;
    position: fixed;
    border: 1px solid transparent;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    z-index: 99999;
    top: 130px; /* Position the alert at the top */
    opacity: 1; /* Start fully visible */
    transition: opacity 0.1s ease;

    /* Error style */
    &.error {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }

    /* Success style */
    &.success {
        color: #303130;
        background-color: #aef7ae;
        border-color: #d6e9c6;
    }

    /* Global style for alerts */
    &.globle {
        max-width: 70%;
        min-width: 300px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        margin-left: auto;
        margin-right: auto;

        /* Close button inside global alerts */
        .close {
            font-size: 18px;
            position: absolute;
            top: 50%;
            right: 6px;
            transform: translateY(-50%);
        }
    }

    /* Error style with global class */
    &.error.globle {
        background-color: #fee;
        border: 1px solid #ffb8b8;
        color: #a66;
    }

    /* Success style with global class */
    &.success.globle {
        border: 1px solid #ded;
        color: #303130;
        background-color: #aef7ae;
    }

    /* Close button style */
    .close {
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        font-size: 18px;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: 0.6;
        filter: alpha(opacity=20);

        &:hover {
            color: #000;
            text-decoration: none;
            cursor: pointer;
            opacity: 0.5;
            filter: alpha(opacity=50);
        }
    }

    /* Animation for alert entry (if needed) */
    @keyframes mymove {
        from {
            top: 0px;
        }
        to {
            top: 50px;
        }
    }

    /* Responsive design for small screens */
    @media only screen and (max-width: 767px) {
        &.globle {
            width: calc(100% - 50px); /* Adjust width for smaller screens */
        }
    }
`;


export const RadioButtonsWrapper = styled.div`
&.margin-25{
  margin-top: -25px;
}
.box {
  gap: 20px;
}
.label{
  font-size: 15px;
  color: #082654;
  margin-bottom: 10px;
  font-weight: 600;
 


}
.error{
    color: #FF0000;
    background-color: #FFE9E9;
    padding: 4px 10px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;
    width: 100%;
  }

`;
export const RadioButtonWrapp = styled.label`

background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 1px 2px #00000017;
border: 1px solid #E1E1E1;
border-radius: 5px;
height: 50px;
display: flex;
align-items: center;
padding-inline: 10px;
gap: 4px;
overflow: hidden;
position: relative;
cursor: pointer;
width: 100%;
&.focus,
&:hover{
  border: 1px solid #26B9DB;
}
input{
   opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -40px; 
  &:checked{
    &+svg{
      #Ellipse_24{
        fill:#5CB85C;
      }
      
    }
  }
}
span{
  font-size: 15px;
  font-weight: 600;
  color: #000;
}
`