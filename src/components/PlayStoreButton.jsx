import React from "react";
import playstorebutton from '../images/playstore.webp';
const PlayStoreButton = () => {
    return (
        <>
            <a href="https://play.google.com/store/apps/details?id=com.salarytopup.salarytopup">
                <img alt="Get it on Google Play"
                    src={playstorebutton}
                    height="60" />
            </a>
        </>
    )
}


export default PlayStoreButton