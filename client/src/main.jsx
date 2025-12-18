import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./Components/Cart/CartContext.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Only one router here */}
      <CartProvider>
        <PayPalScriptProvider>
          <App />
        </PayPalScriptProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
