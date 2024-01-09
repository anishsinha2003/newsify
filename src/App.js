import {useState, useEffect} from "react";
import './App.css';
import 'react-slideshow-image/dist/styles.css';
import HomePage from "./components/pages/HomePage.js"
import HealthPage from "./components/pages/HealthPage.js"
import SportsPage from "./components/pages/SportsPage.js"
import TechPage from "./components/pages/TechPage.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sports" element={<SportsPage />} />
        <Route path="health" element={<HealthPage />} />
        <Route path="tech" element={<TechPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
