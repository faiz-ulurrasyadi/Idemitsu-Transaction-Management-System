import Header from "../components/Header"
import { useState, useEffect } from "react"
import { supabase } from "../services/supabase-client"
import cart from '../assets/shopping-cart.png'
import { productsImgData } from '../assets/productsImg'
import './Carts.css'

function Carts({ cartLists, setCartLists }) {
    const carts = []
    const [detailedCartLists, setDetailedCartLists] = useState([])
    const [totalCart, setTotalCart] = useState({amount: 0, item: 0})

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }
    
    const isDiscount = () => {

    }

    const changeQtyHandler = (list, type) => {
        if (type === "dec"){
            if (list.quantity >= 2){
                setCartLists((prev) =>
                prev.map((item) => 
                    item.product_id === list.product_id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ))
            } else {
                return
            }
        } else {
            setCartLists((prev) =>
            prev.map((item) => 
                item.product_id === list.product_id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ))
        }
    }

    const calcTotal = () => {
        let total = 0
        let totalItem = 0
        cartLists.forEach(list => {
            const totalPerItem = parseInt(list.quantity) * parseInt(list.price)
            total = total + totalPerItem
            totalItem = totalItem + list.quantity
        })
        setTotalCart({amount: total, item: totalItem})
    }

    useEffect(() => {
        calcTotal()
    }, [cartLists])

    return (
        <div className="cart-pages">
            <h1>
                Your shopping carts({totalCart.item})
            </h1>
            <div className="cart-container">
                <div className="items-container">
                    {cartLists.map((list, idx) => (
                    <div key={idx + list.product_id} className="item-box">
                        <div className="item-container">
                            <img src={productsImgData[list.product_id]} className="cart-item-img" />
                            <div className="cart-desc">
                                <p className="item-name">{list.product_name}</p>
                                <p className="item-price">{showInRupiah(list.price)}</p>
                                <div className="qty-change-container">
                                    <button 
                                        className="incdec-qty"
                                        onClick={() => changeQtyHandler(list, "dec")}
                                    >-</button>
                                    <label htmlFor="item-qty">
                                        <input 
                                            type="number" 
                                            id="item-qty"
                                            value={list.quantity}
                                            onChange={(e) => {
                                                const newQty = parseInt(e.target.value)
                                                setCartLists((prev) =>
                                                    prev.map((item) =>
                                                        item.product_id === list.product_id
                                                        ? { ...item, quantity: newQty }
                                                        : item
                                                ))
                                            }}
                                            min="1"
                                        /> 
                                    </label>
                                    <button 
                                        className="incdec-qty"
                                        onClick={() => changeQtyHandler(list, "inc")}
                                    >+</button>
                                </div>
                            </div>
                            <button className="delete-item-btn">🗑</button>
                        </div>
                        <div className="item-total">
                            {24-list.quantity<=5 && (<p className="item-bonus-modal">Add more to get discount!!</p>)}
                            <p>{showInRupiah(parseInt(list.price) * parseInt(list.quantity))}</p>
                        </div>
                    </div>))}
                </div>
                <div className="checkout-container">
                    <p>Total amount: {showInRupiah(totalCart.amount)}</p>
                    <button type="submit" className="checkout-btn">Checkout</button>
                </div>
            </div>
            <button onClick={() => {
                setCartLists([])
            }}>reset cart</button>
        </div>
    )
}

export default Carts