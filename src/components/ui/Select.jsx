import React, { useRef, useState } from 'react';
import { InputWrapper } from './style';

function Select({
  value = "",
  name = "",
  label = "",
  placeholder = "",
  error = "",
  options = [],
  disabled = false,
  required = false,  // Add required prop
  onChange = () => {},
  ...others
}) {
  const [focus, setFocus] = useState("");
  const input = useRef();

  const focusInput = () => {
    input.current.focus();
  };

  return (
    <InputWrapper>
      <div className={`inputField ${focus} ${disabled ? "disabled" : ""}`} onClick={focusInput}>
        <label htmlFor={name}>
          {label}
          {required && <span style={{ color: 'red',fontSize:"16px" }}> *</span>} {/* Add red asterisk */}
        </label>
        <select
          ref={input}
          value={value}
          name={name}
          onChange={onChange}
          placeholder=""
          disabled={disabled}
          {...others}
          onFocus={() => setFocus("focus")}
          onBlur={() => setFocus("")}
        >
          {placeholder !== "" && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="error">{error}</div>}
    </InputWrapper>
  );
}

export default Select;
