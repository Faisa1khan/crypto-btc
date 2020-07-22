import React from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style.css";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <div className="App">
        <Header branding="Real-Time Cryptocurrency Dashboard" />
        <div className="container">
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default App;
