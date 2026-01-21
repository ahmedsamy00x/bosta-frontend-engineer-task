import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./components/layout/Home"
import AppLayout from "./components/layout/AppLayout"
import ProductDetails from "./components/products/ProductDetails"
const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter