import React, { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Router from "./Router";
import WhatsAppButton from "./components/WhatsAppButton";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const showmessage = async (message) => {
    try {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = message;
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HelmetProvider>
      <Router />
      <WhatsAppButton />
    </HelmetProvider>
  );
};

export default App;
