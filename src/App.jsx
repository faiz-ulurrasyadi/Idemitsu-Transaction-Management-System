import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Carts from "./pages/Carts.jsx"
import MyPages from "./pages/MyPages.jsx"
import AddProduct from "./components/AddProduct.jsx"
import ListProducts from "./components/ListProducts.jsx"

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carts" element={<Carts />} />
                <Route path="/my-pages" element={<MyPages />}>
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="list-of-products" element={<ListProducts />} />
                </Route>
            </Routes>
        </Router>
    </>
  )
}

export default App