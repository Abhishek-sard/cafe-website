import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Components/Home/Hero";
import Imagetwo from "./Components/Home/Imagetwo";
import BestSeller from "./Components/Home/BestSeller";
import Testimonials from "./Components/Home/Testimonials";
import MenuPage from "./Components/Menu/MenuPage";
import AboutUs from "./Components/About/AboutUs";
import CompanyProfile from "./Components/About/CompanyProfile";
import Contact from "./Components/About/Contact";
import CartPage from "./Components/Cart/CartPage.jsx";

// Authentication & Authorization
import Register from "./Components/Authentication/Register.jsx";
import Login from "./Components/Authentication/Login.jsx";
import VerifyEmail from "./Components/Authentication/VerifyEmail.jsx";
import ForgotPassword from "./Components/Authentication/ForgetPassword.jsx";
import ResetPassword from "./Components/Authentication/ResetPassword.jsx";
import UserDashboard from "./Components/Authentication/UserDashbaord.jsx";
import AdminDashboard from "./Components/Authentication/AdminDashboard.jsx";
import ProtectedRoute from "./Components/utils/ProtectedRoute.jsx";

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
  return <MenuPage />;
}

function AboutPage() {
  return <AboutUs />;
}

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuItems />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/CompanyProfile" element={<CompanyProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
