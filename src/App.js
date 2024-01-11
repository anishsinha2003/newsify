import './App.css';
import 'react-slideshow-image/dist/styles.css';
import HomePage from "./components/pages/HomePage.js"
import HealthPage from "./components/pages/HealthPage.js"
import SportsPage from "./components/pages/SportsPage.js"
import TechPage from "./components/pages/TechPage.js"
import BusinessPage from "./components/pages/BusinessPage.js"
import QueryPage from "./components/pages/QueryPage.js"
import Loading from "./components/pages/Loading.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="sports" element={<SportsPage />} />
        <Route path="health" element={<HealthPage />} />
        <Route path="tech" element={<TechPage />} />
        <Route path="business" element={<BusinessPage />} />
        {/* search is passed in as a parameter, so query as a prop is not needed. we can access
        the params from useParams in QueryPage.js */}
        <Route path="query/:search" element={<QueryPage/>} />
        <Route path="loading" element={<Loading/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
