import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
