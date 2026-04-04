import { NavLink, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../services/supabase-client"
import { productsImgData } from '../assets/productsImg'
import './TransactionDetail.css'
import { useTransactionStore } from "../contexts/useTransactionStore"
import InstallmentPayments from "./InstallmentPayments"

const TransactionDetail = () => {
    const { transaction_id } = useParams()
    // const [transactionData, setTransactionData] = useState({})
    // const [transactionItems, setTransactionItems] = useState([])
    const transactionStatusMsg = {
        "paid": "Transaction successful",
        "pending": "Transaction is pending",
        "partial": "Transaction is on partial payment",
        "failed": "Transaction failed"
    }
    const [viewPayments, setViewPayments] = useState(null)
    const [payments, setPayments] = useState([])
    const { transactions, setTransactions, updateTransactions, addTransactions, removeTransactions,
        transaction_items, addTransactionsItems,
        installment_plans, updateInstallmentPlans, addInstallmentPlans,
        installment_payments, updateInstallmentPayments, addInstallmentPayments,
        isFetched } = useTransactionStore()
    const transactionData = transactions.filter(transaction => 
        transaction.transaction_id === transaction_id)[0]
    const transactionItems = transaction_items.filter(item => 
        item.transaction_id === transaction_id)
    const installment_id = transactionData.payment_type === "installment" ? 
        installment_plans.filter(plan => plan.transaction_id === transaction_id)[0].installment_id : 
        null
    const installmentPayments = installment_id ? 
        installment_payments.filter(payment => payment.installment_id === installment_id) : 
        null

    const fetchData = async () => {
        // const { data, error } = await supabase.from('installment_payments').select('*').eq())
    }
    const fetchDatas = async () => {
        // const [transRes, itemRes] = await Promise.all([
        //     supabase.from('transactions_oil').select('*').eq('transaction_id', transaction_id).single(),
        //     supabase.from('transaction_items_oil').select('*').eq('transaction_id', transaction_id).order('id')
        // ])

        // setTransactionData(transRes.data)
        // setTransactionItems(itemRes.data)
    }

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }

    const transactionDateHandler = (date) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const options12hr = { hour: 'numeric', minute: '2-digit', hour12: true };
        const dateTime = new Date(transactionData.transaction_date)
        const transaction_date = dateTime.toLocaleDateString("en-GB", options)
        const transaction_time = dateTime.toLocaleTimeString("en-US", options12hr)
        return `${transaction_date}, ${transaction_time}`
    }

    useEffect(() => {
        fetchDatas()
    }, [])

    return (
        <div>
            <h1 style={{fontSize: "24px"}}>Transaction Details</h1>
            <div className="transaction_details_container">
                <div className="transaction_details">
                    <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '0px'}}>{transactionStatusMsg[transactionData.status]}</p>
                    <div className="details_container">
                        <p className="left_side parMar">Transaction id:</p>
                        <p className="right_side parMar">{transactionData.transaction_id}</p>
                        <p className="left_side parMar">Transaction date:</p>
                        <p className="right_side parMar">{transactionDateHandler(new Date(transactionData.transaction_date).toISOString())}</p>
                        <p className="left_side parMar">Bonus level:</p>
                        <p className="right_side parMar">{transactionData.level}</p>
                    </div>
                    <div className="transaction_items_container">
                        <p style={{ fontWeight: 'bold', fontSize: '20px'}}>Transaction Items</p>
                        <div className="items_container">
                            {transactionItems.map(item => (
                                <div className="item_container" key={item.product_id}>
                                    <img 
                                        src={productsImgData[item.product_id]}
                                        style={{width: "20px"}}
                                    />
                                    <div>
                                        <p className='parMar'><strong>{item.product_name}</strong></p>
                                        <p className='parMar item_price'>{item.quantity} barang x {showInRupiah(item.price)}</p>
                                    </div>
                                    <p style={{textAlign: 'right'}}>{showInRupiah(item.subtotal)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {transactionData.payment_type==="full"?(
                        <div className="payment_details_container">
                            <p style={{ fontWeight: 'bold', fontSize: '20px'}}>Payment Details</p>
                            <div className="payment_details">
                                <p className="left_side parMar">Payment type:</p>
                                <p className="right_side parMar">{transactionData.payment_type}</p>
                                <p className="left_side parMar">Payment method:</p>
                                <p className="right_side parMar">{transactionData.payment_method}</p>
                                <p className="left_side parMar">Payment amount:</p>
                                <p className="right_side parMar">{showInRupiah(transactionData.total_amount)}</p>
                            </div>
                        </div>
                    ):(
                        <div className="payment_details_container">
                            <p style={{ fontWeight: 'bold', fontSize: '20px'}}>Payment Details</p>
                            <div className="payment_details">
                                <p className="left_side parMar">Payment type:</p>
                                <p className="right_side parMar">{transactionData.payment_type}</p>
                                <p className="left_side parMar">Payment amount:</p>
                                <p className="right_side parMar">{showInRupiah(transactionData.total_amount)}</p>
                                <p className="left_side parMar">Total installments:</p>
                                <p className="right_side parMar">{transactionData.total_installments}</p>
                            </div>
                            <button className="installment_payments_btn" onClick={() => setViewPayments(transaction_id)}>View Installment Payments</button>
                        </div>
                    )}
                </div>
                <div className="transaction_btn">
                    <button className="edit-btn btn">Edit</button>
                    {/* <NavLink className="delete-btn btn" to="/my-pages/my-transactions" onClick={deleteTransactionHandler}>Delete</NavLink> */}
                    <NavLink className="nav-link btn" to="/my-pages/my-transactions">Back</NavLink>
                </div>
            </div>
            {viewPayments === transaction_id && (<InstallmentPayments setViewPayments={setViewPayments} />)}
        </div>
    )
}

export default TransactionDetail