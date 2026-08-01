import { useNavigate } from "react-router-dom";



export function isEmpty(obj) {
	let isEmpty = false;
	const type = typeof obj;
	isEmpty = isEmpty || !obj;
	isEmpty = isEmpty || type === 'undefined'; // if it is undefined
	isEmpty = isEmpty || obj === null; // if it is null
	isEmpty = isEmpty || (type === 'string' && obj.trim() === ''); // if the string is empty or only have spaces
	isEmpty = isEmpty || obj === false || obj === 0; // if boolean value returns false
	isEmpty = isEmpty || (Array.isArray(obj) && obj.length === 0); // if array is empty
	isEmpty = isEmpty || (type === 'object' && Object.keys(obj).length === 0); // if object is empty
	return isEmpty;
}


// check if value is pinCode
export function isPinCode(value) {
    return value.match(/^[1-9][0-9]{5}$/);
  }
  
  // check if the value is positive number
  export function isNumeric(value) {
    return value.match(/^\d+$/);
  }
  
  // check if the value is integer or float
  export function isNumber(value, integerOnly = true) {
    if (integerOnly) {
      return value.match(/^\s*[+-]?\d+\s*$/);
    }
  
    return value.match(/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/);
  }
  
  export function isFloatNumber(value) {
    return String(value).match(/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/);
  }
  
  // check if the strinc contains alphabets (spaces) only
  export function isAlphabet(value, allowSpaces = true) {
    if (allowSpaces) {
      return value.match(/^[a-zA-Z\s]+$/);
    }
  
    return value.match(/^[a-zA-Z]+$/);
  }
  
  export function isName(value) {
    return value.match(/^[a-zA-Z0-9,./\-' ]*$/);
  }
  

  export const goBack = (navigate,url="") => {
    if(url === ""){
      navigate(-1);
    }else{
      navigate(url);
    }
      
  };
  

export const setStorage = (key,value) =>{
   const data = JSON.stringify(value)
  sessionStorage.setItem(key,data)
}
export const getStorage = (key) =>{
 try {
  let data = sessionStorage.getItem(key);
  if(data){
   return JSON.parse(data);
  }else{
   return undefined;
  }
 
 } catch (error) {
  
 }
}

export function formateDate(dateobject){
  const date = new Date(dateobject);

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(date.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

return  formattedDate;
}