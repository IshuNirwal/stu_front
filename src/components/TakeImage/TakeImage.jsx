import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import Button from '../ui/Button';
import { TakeImageWrapper } from './style';

function TakeImage({setImage=()=>{},close=()=>{}}) {


    const webcamRef = useRef(null);


const captureSelfie = () => {
  const imageSrc = webcamRef.current.getScreenshot();
  setImage(imageSrc);
  close(false)
};

  return (
    <TakeImageWrapper>
    <div className="imgaeBox">
    <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: "user",
        }}
      />
 
    </div>
    <div className="flex" style={{gap:"8px"}}>
    <Button title="Capture" className='' onClick={captureSelfie} />
    <Button title="Cancel" className="" onClick={()=>close(false)} />
    </div>
    
    </TakeImageWrapper>
  )
}

export default TakeImage