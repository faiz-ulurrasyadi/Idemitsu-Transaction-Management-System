import Header from "../components/Header"
import { useState, useEffect } from "react"
import { supabase } from "../services/supabase-client"
import cart from '../assets/shopping-cart.png'
import { productsImgData } from '../assets/productsImg'
import './Carts.css'
import TransactionForm from "../components/TransactionForm"

function Carts({ cartLists, setCartLists }) {
    const carts = []
    const [detailedCartLists, setDetailedCartLists] = useState([])
    const [totalCart, setTotalCart] = useState({amount: 0, item: 0})
    const [deleteId, setDeleteId] = useState(null)
    const [levelTotal, setLevelTotal] = useState(0)
    const [transItems, setTransItems] = useState([])
    const [transactions, setTransactions] = useState({
        transaction_id: '',
        user_id: '',
        transaction_date: new Date(),
        payment_type: 'full',
        payment_method: 'cash',
        status: 'pending', //pending, paid, partial, failed
        total_amount: totalCart.amount,
        level: levelTotal,
        notes: '',
    })

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }
    const bonusHandle = (qty) => {
        if (qty<24 && 24-qty<=5){
            return `Add ${24-qty} more to get discount!!`
        } else if (qty>24 && qty%24>=19){
            return `Add ${24-(qty%24)} more to get discount!!`
        }
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
    const deleteCart = async (id) => {
        setCartLists((prev) => prev.filter(item => item.product_id!==id))
        setDeleteId(null)
    }
    const levelhandle = () => {
        let level = 0
        cartLists.forEach(list => {
            level = level + parseInt(list.quantity/24)
        })
        setLevelTotal(level)
    }
    const generateId = () => {
        const now = new Date()
        const ms = String(now.getMilliseconds()).padStart(3, '0')
        const date = now.toISOString().slice(0,10).replace(/-/g, '')
        const random = Math.floor(10000 + Math.random() * 90000)

        return `IDM-${date}${ms}-${random}`
    }
    const insertToDatabase = async (data) => {
        const { error } = await supabase.from('transaction_items_oil').insert(data).single()

        if (error){
            console.log(error)
        }
    }
    const checkoutHandle = async () => {
        const tempTrans_id = generateId()
        const tempTransItems = cartLists.map(list => ({
            transaction_id: tempTrans_id,
            product_id: list.product_id,
            product_name: list.product_name,
            price: list.price,
            quantity: list.quantity,
            subtotal: list.price * list.quantity,
        }))
        const tempTransaction = {...transactions,
            transaction_id: tempTrans_id,
            total_amount: totalCart.amount,
            level: levelTotal,
        }
        const { error } = await supabase.from('transactions_oil').insert(tempTransaction).single()
        setTransactions(tempTransaction)
        console.log(tempTransItems)
        tempTransItems.forEach(item => insertToDatabase(item))
    }

    useEffect(() => {
        calcTotal()
        levelhandle()
    }, [cartLists])

    return (
        <div className="cart-pages">
            <h1>
                Your carts({totalCart.item})
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
                            <button 
                                className="delete-item-btn"
                                onClick={() => setDeleteId(list.product_id)}
                            >🗑</button>
                        </div>
                        <div className="item-total">
                            <p className="item-bonus-modal">{bonusHandle(list.quantity)}</p>
                            <p>{showInRupiah(parseInt(list.price) * parseInt(list.quantity))}</p>
                        </div>
                        <div className="delete-modal" style={{display: deleteId === list.product_id? "block":"none"}}>
                            <p style={{marginTop: "0px"}}>Are you sure you want to remove this from cart?</p>
                            <div className="delete-btn-box">
                                <button className="yes-delete" onClick={() => deleteCart(list.product_id)}>yes</button>
                                <button className="no-delete" onClick={() => setDeleteId(null)}>no</button>
                            </div>
                        </div>
                    </div>))}
                </div>
                <div className="checkout-container">
                    <p>Total amount: {showInRupiah(totalCart.amount)}</p>
                    <p>Bonus level: {levelTotal}</p>
                    <TransactionForm transactions={transactions} setTransactions={setTransactions}/>
                    {/* {transItems.length!==0 && (
                        transItems.map(item => (
                            <div>
                                <p>{item.transaction_id}</p>
                                <p>{item.product_name}</p>
                            </div>
                        ))
                    )} */}
                    <button type="submit" className="checkout-btn" onClick={checkoutHandle}>Checkout</button>
                </div>
            </div>
            <button onClick={() => {
                setCartLists([])
            }}>Clear cart</button>
        </div>
    )
}

export default Carts