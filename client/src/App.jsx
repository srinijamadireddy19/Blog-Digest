import React, { useState } from "react";
import api from "./api/axiosConfig";
import Header from "./components/Header";
import TextContainer from "./components/TextContainer";
import Footer from "./components/Footer";
import Output from "./components/Output";
import AppRouter from "./routes/AppRouter";
function App() {

  return (
    <div>
      
    <AppRouter/>

    </div>
  );
}

export default App;
