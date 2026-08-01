

import React, { useState } from 'react'
import  './style.css';


function RangeSlider({min="1",max="100", step="1",value=1, setValue=()=>{}}) {


    const handleInput = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
    };
  
    return (
      <div
    
        className="range-slider grad"
        style={{
            width:"100%",
          '--min': Number(min),
          '--max': Number(max),
          '--step': Number(step),
          '--value': value,
          '--text-value': JSON.stringify((+value).toLocaleString()),
          '--prefix': '"$"',
        }}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={handleInput}
        />
        {/* <output></output> */}
        <div className="range-slider__progress"></div>
      </div>
    );
}

export default RangeSlider;