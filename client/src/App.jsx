import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Components/Home/Hero";
import React from "react";
import Imagetwo from "./Components/Home/Imagetwo";
import BestSeller from "./Components/Home/BestSeller";
import Testimonials from "./Components/Home/Testimonials";
import MenuPage from "./Components/Menu/MenuPage";
import AboutUs from "./Components/About/AboutUs";
import CompanyProfile from "./Components/About/CompanyProfile";
import Contact from "./Components/About/Contact";

function HomePage() {
  return (
    <main>
      <Hero />
      <Imagetwo />
      <BestSeller />
      <Testimonials />

    </main>
  );
}


function MenuItems() {
  return (
    <MenuPage />
  )
}

function AboutPage() {
  return (
    <>
      <AboutUs />
    </>

  )

}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuItems />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/CompanyProfile" element={<CompanyProfile />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
