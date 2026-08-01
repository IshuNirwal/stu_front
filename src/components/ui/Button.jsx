

import React from 'react'
import styles from './button.module.css';
function Button({title="Button",loading=false,onClick=()=>{}, className=""}) {
  className=className+" "+styles.buttonWrapper
  return (
    <button onClick={onClick} disabled={loading} className={loading?"disabled "+className:className}>
        {!loading?title:<div className={styles.loader}></div>}
    </button>
  )
}

export default Button;