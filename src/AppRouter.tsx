import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./components/layout/Home"
import AppLayout from "./components/layout/AppLayout"
import ProductDetails from "./components/products/ProductDetails"
import CreateProductPage from "./components/pages/CreateProductPage"
import CartPage from "./components/pages/CartPage"
const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/create" element={<CreateProductPage />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter