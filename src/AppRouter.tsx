import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./components/pages/HomePage"
import AppLayout from "./components/layout/AppLayout"
import ProductDetails from "./components/products/ProductDetails"
import CreateProductPage from "./components/pages/CreateProductPage"
import CartPage from "./components/pages/CartPage"
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute"

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/products/create" element={
              <ProtectedRoute>
                <CreateProductPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/signup" element={<PublicRoute>
                <SignupPage />
              </PublicRoute>
            } />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter