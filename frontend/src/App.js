import './App.css';
import Products from "./components/Products";
import Filter from "./components/Filter";
import React from "react";
function App() {
  return (
      <div className="App">
          <header className="App-header">
              <Products />
          </header>
      </div>
  );
}
export default App;
