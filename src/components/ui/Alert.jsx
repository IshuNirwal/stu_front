import React, { useEffect } from 'react';
import { isEmpty } from '../../Utils/common';
import { AlertWrapper } from './style';

function Alert({ setMessage = () => {}, message, timeOut = 1000 }) {
    useEffect(() => {
        let timerId = null;

        if (!isEmpty(message) && timeOut !== null) {
            timerId = setTimeout(() => {
                setMessage({});
            }, timeOut);
        }

        return () => clearTimeout(timerId); // Cleanup the timer on unmount or when message changes
    }, [message, timeOut, setMessage]);

    return (
        <>
            {!isEmpty(message) && (
                <AlertWrapper className={`${message.type} ${message.place}`}>
                    <span className="close" onClick={() => setMessage({})}>
                        ×
                    </span>
                    {message.msg}
                </AlertWrapper>
            )}
        </>
    );
}

export default Alert;
