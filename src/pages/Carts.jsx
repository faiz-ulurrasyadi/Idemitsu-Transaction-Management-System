import Header from "../components/Header"
import { useState } from "react"

function Carts({ cartList }) {
    return (
        <div>
            <Header/>
            <h1>Carts</h1>
            <p>{cartList}</p>
        </div>
    )
}

export default Carts