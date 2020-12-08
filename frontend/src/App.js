import './App.css';
import Products from "./components/Products";
import React from "react";
import Navbar from "./components/Navbar";
function App() {
  return (
      <div className="App">
          <Navbar />
          <Products />
      </div>
  );
}
export default App;
