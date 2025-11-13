import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy } from "react";
import Header from "./pages/components/Header";
import AuthCheck from "./pages/components/AuthCheck";
import CheckoutPage from "./pages/cart/Checkout";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Products = lazy(() => import("./pages/products/Products"));
const Cart = lazy(() => import("./pages/cart/Cart"));

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


function AppContent() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const hideHeaderOnPages = ["/", "/register"];
  const shouldHideHeader = hideHeaderOnPages.includes(location.pathname);

  return (
    <>
      {token && !shouldHideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/products"
          element={
            <AuthCheck>
              <Products />
            </AuthCheck>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthCheck>
              <Cart />
            </AuthCheck>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthCheck>
              <CheckoutPage />
            </AuthCheck>
          }
        />

      </Routes>
    </>
  );
}
