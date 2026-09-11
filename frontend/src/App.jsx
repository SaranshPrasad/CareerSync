import "./App.css";
import { Route, Routes, useLocation } from "react-router";

import Navbar from "./Components/Navbar";
import CTA from "./Components/CTA";


import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import Auth from "./Pages/Auth";
import About from "./Components/About";


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
       
      </Routes>

      {!isAuthPage && <CTA />}
    </>
  );
}

export default App;