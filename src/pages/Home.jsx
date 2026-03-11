import Header from "../components/Header.jsx"
import Products from "../components/Products.jsx"
import { useState } from "react"

function Home() {
    const [products, setProducts] = useState("")

    return (
        <div>
            <Header setSearch={setProducts} />
            <Products search={products} />
        </div>
    )
}
export default Home