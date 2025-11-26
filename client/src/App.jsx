import React from "react";
import Navbar from "./Navbar";
import "./index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="text-center mt-10 text-white">
        <h1 className="text-3xl text-yellow-400 font-bold">Elite Café Navigation</h1>
        <p className="text-gray-300 mt-4">
          This is the Tailwind CSS version of your café navigation bar.
        </p>
      </div>
    </>
  );
};

export default App;
