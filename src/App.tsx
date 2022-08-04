import React from "react";
import { BigBuyLogo } from "./assets";
import "./App.css";
import EmployeesList from "./components/EmployeesList";

function App() {
  return (
    <div className="App">
      <header>
        <img src={BigBuyLogo} alt="BigBuy logo" />
      </header>
      <main>
        <EmployeesList />
      </main>
    </div>
  );
}

export default App;
