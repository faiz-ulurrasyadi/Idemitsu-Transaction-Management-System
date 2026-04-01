import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Carts from "./pages/Carts.jsx"
import MyPages from "./pages/MyPages.jsx"
import AddProduct from "./components/AddProduct.jsx"
import ListProducts from "./components/ListProducts.jsx"
import { useState } from "react"
import MyTransactions from "./components/MyTransactions.jsx"
import Header from "./components/Header.jsx"
import Products from "./components/Products.jsx"
import TransactionDetail from "./components/TransactionDetail.jsx"

function App() {
    const [cartLists, setCartLists] = useState([])
    const [products, setProducts] = useState([])

    const getCartList = (data) => {
        if (cartLists){
            const existingItem = cartLists.find(list => list.product_id === data.prodId)

            if (existingItem){
                setCartLists((prev) => prev.map((item) => 
                    item.product_id === data.prodId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ))
                // existingItem.quantity += 1
            } else {
                setCartLists((prev) => [...prev, {
                    product_id: data.prodId, 
                    quantity: 1,
                    product_name: data.prodName,
                    price: data.prodPrice,
                }])
            }
        } else {
            setCartLists((prev) => [...prev, {
                product_id: data, 
                quantity: 1,
                product_name: data.prodName,
                price: data.prodPrice,
            }])
        }
    }

    return (
        <>
            <Router>
                <Header cartLists={cartLists} setSearch={setProducts}/>
                <Routes>
                    <Route path="/" element={<Products getCartList={getCartList} search={products}/>} />
                    <Route path="/carts" element={<Carts cartLists={cartLists} setCartLists={setCartLists}/>} />
                    <Route path="/my-pages" element={<MyPages cartLists={cartLists}/>}>
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="list-of-products" element={<ListProducts />} />
                        <Route path="my-transactions">
                            <Route index element={<MyTransactions />} />
                            <Route path=":transaction_id" element={<TransactionDetail />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App