import Header from "../components/Header.jsx"
import Products from "../components/Products.jsx"
import { useState } from "react"

function Home({ getCartList}) {
    const [products, setProducts] = useState("")

    return (
        <div>
            <Header setSearch={setProducts}/>
            <Products search={products} getCartList={getCartList}/>
        </div>
    )
}
export default Home