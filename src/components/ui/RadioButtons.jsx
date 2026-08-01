import React from 'react';
import { RadioButtonsWrapper, RadioButtonWrapp } from './style';
import CheckboxIcon from '../../images/CheckboxIcon';

function RadioButtons({
  title = "",
  error = "",
  className = "",
  cls = "",
  value = "",
  options = [],
  required = false, // Add required prop
  onChange = () => {},
}) {
  return (
    <RadioButtonsWrapper className={cls}>
      {title && (
        <div className="label">
          {title}
          {required && <span style={{ color: 'red',fontSize:"16px" }}> *</span>} {/* Add red asterisk */}
        </div>
      )}
      <div className={`box ${className}`}>
        {options.map((val, index) => (
          <RadioButton
            key={index}
            name={val.name}
            value={val.value}
            label={val.label}
            onChange={onChange}
            checked={val.value === value}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </RadioButtonsWrapper>
  );
}

export default RadioButtons;


export const RadioButton = ({ name = "", value = "", label = "", onChange = () => {}, checked = false }) => {
  return (
    <RadioButtonWrapp htmlFor={value} className={checked ? "checked" : ""}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <CheckboxIcon size={20} className={checked ? "visible" : "hidden"} />
      <span>{label}</span>
    </RadioButtonWrapp>
  );
};



