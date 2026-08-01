import React from 'react';

function CheckboxIcon2({ color = "#e1e1e1", size = 27, number = 0 }) {
  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: '50%', // Making it circular
      color: '#fff',
      fontSize: size * 0.4, // Adjust font size relative to the size prop
    }}>
      {number}
    </div>
  );
}

export default CheckboxIcon2;
