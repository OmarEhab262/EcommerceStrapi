import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PrivateRoute from "./auth/PrivateRoute";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import LoginPage from "./pages/Login";
import ProductPage from "./pages/Product";
import ProductsPage from "./pages/Products";
import AdminDashboard from "./pages/dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Public routes */}
          <Route
            index
            element={
              <PrivateRoute redirectPath="/login">
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute redirectPath="/login">
                <AboutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="products"
            element={
              <PrivateRoute redirectPath="/login">
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="products/:productId"
            element={
              <PrivateRoute redirectPath="/login">
                <ProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute redirectPath="/login">
                <HomePage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<h1>categories</h1>} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        transition={Bounce}
        autoClose={1500}
      />
    </>
  );
}

export default App;
