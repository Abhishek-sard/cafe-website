import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
