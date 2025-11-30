import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Components/Home/Hero";
import React from "react";
import Imagetwo from "./Components/Home/Imagetwo";
import BestSeller from "./Components/Home/BestSeller";
import Testimonials from "./Components/Home/Testimonials";

function HomePage() {
  return (
    <main>
      <Hero />
      <Imagetwo/>
      <BestSeller/>
      <Testimonials/>
      
    </main>
  );
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
