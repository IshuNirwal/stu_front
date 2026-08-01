export const regexPan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPass = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/;
const regexGst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const regexMobile = /^[6789]\d{9}$/;
const regexPincode = /^(\d{4}|\d{6})$/;
const prettifyLabel = (key) => {
  if (!key) return "";

  return key
    .replace(/[_\s]+/g, " ")                    // Convert snake_case to space
    .replace(/([a-z])([A-Z])/g, "$1 $2")        // Split camelCase
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")        // Split letters and numbers
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export const validateField = (key, value) => {
  switch (key) {
    case "email":
    case "businessEmail":
      if (!value) return "Email is required!";
      if (!regexEmail.test(value)) return "This is not a valid email format!";
      break;
    case "password":
      if (!value) return "Password is required!";
      // optionally: add regexPass check
      break;
    case "mobileNumber":
      if (!value) return "Mobile number is required!";
      if (!regexMobile.test(value)) return "Mobile number invalid!";
      break;
    case "panNumber":
      if (!value) return "Pan number is required!";
      if (!regexPan.test(value)) return "Please enter a valid pan number!";
      break;
    case "gstNumber":
      if (!value) return "GST number is required!";
      if (!regexGst.test(value)) return "Please enter a valid GST Number!";
      break;
    case "pinCode":
      if (!value) return "Pin code is required!";
      if (!regexPincode.test(value)) return "The Pin Code is invalid!";
      break;
    default:
      if (
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return `${prettifyLabel(key)} is required!`;
      }
      break;
  }
};
export const formValidation = (values, excludeField = [], errorsObj = {}) => {
  const errors = {};

  if (errorsObj && Object.keys(errorsObj).length !== 0) {
    Object.keys(values).forEach((key) => {
      if (!excludeField.includes(key)) {
        errors[key] = errorsObj[key];
      }
    });
  } else {
    Object.keys(values).forEach((key) => {
      if (!excludeField.includes(key)) {
        const error = validateField(key, values[key]);
        if (error) {
          errors[key] = error;
        }
      }
    });
  }

  return errors;
};


// export const formValidation = (values, excludeField, errorsObj) => {
//     const errors = {};
//     if (errorsObj && Object.keys(errorsObj).length != 0) {
//       Object.keys(values).map((key) => {
//         if (!excludeField.includes(key)) {
//           errors[key] = errorsObj[key];
//         }
//       });
//       return errors;
//     } else {
//       Object.keys(values).map((key) => {
//         if (!excludeField || (excludeField && !excludeField.includes(key))) {
//           const error = validateField(key, values[key]);
//           if (error) {
//             errors[key] = error;
//           }
//         }
//       });
//       return errors;
//     }
//   };

