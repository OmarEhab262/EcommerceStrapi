import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import { Button, Flex } from "@chakra-ui/react";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
