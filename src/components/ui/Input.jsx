import React, { useRef, useState } from 'react';
import { InputWrapper } from './style';
import DatePicker from 'react-datepicker';
import calendar from '../../images/calendar.png';
import "react-datepicker/dist/react-datepicker.css";

function Input({
    type = "text",
    value = "",
    name = "",
    label = "",
    error = "",
    onChange = () => {},
    className = "",
    toggle = false,
    required = false,  // Add a required prop to determine if the star is shown
    ...others
}) {
    const [focus, setFocus] = useState("");
    const [passwordState, setPasswordState] = useState(true);
    const input = useRef(null);

    const focusInput = () => {
        if (input.current) {
            input.current.focus();
        }
    };

    return (
        <InputWrapper className={className}>
            <div className={`inputField mt-5 ${focus}`} onClick={focusInput}>
                <label htmlFor={name}>
                    {label}
                    {required && <span style={{ color: 'red',fontSize:"16px" }}> *</span>}
                </label>
                {type !== "date" ? (
                    <>
                        <input
                            ref={input}
                            type={type === "password" ? (passwordState ? "password" : "text") : type}
                            value={value}
                            name={name}
                            onChange={onChange}
                            {...others}
                            onFocus={() => setFocus("focus")}
                            onBlur={() => setFocus("")}
                        />
                        {/* Uncomment this for password toggle */}
                        {/* {toggle && type === "password" && (
                            <div className="toggle" onClick={() => setPasswordState(!passwordState)}>
                                {passwordState ? <FaEye /> : <FaEyeSlash />}{" "}
                            </div>
                        )} */}
                    </>
                ) : (
                    <>
                        <input
                            type="date"
                            value={value || ''} // Ensure value is a string in yyyy-mm-dd format or an empty string
                            onChange={(e) => onChange(e.target.value)} // Pass the string directly
                            className="date-input"
                        />

                        {/* <div className="icon"><img src={calendar} alt="calendar" /></div> */}
                    </>
                )}
            </div>

            {error && <div className="error">{error}</div>}
        </InputWrapper>
    );
}

export default Input;
