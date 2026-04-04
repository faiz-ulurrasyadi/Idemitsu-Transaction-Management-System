import './MyTransactions.css'
import { supabase } from '../services/supabase-client'
import { useState, useEffect } from 'react'
import { productsImgData } from '../assets/productsImg'
import { NavLink } from 'react-router-dom'
import { useTransactionStore } from '../contexts/useTransactionStore'

function MyTransactions(){
    const [transactionDatas, setTransactionDatas] = useState([])
    const [transactionItems, setTransactionItems] = useState([])
    const [oilProducts, setOilProducts] = useState([])
    const { transactions, setTransactions, updateTransactions, addTransactions, removeTransactions,
        transaction_items, addTransactionsItems,
        installment_plans, updateInstallmentPlans, addInstallmentPlans,
        installment_payments, updateInstallmentPayments, addInstallmentPayments,
        isFetched } = useTransactionStore()
    const [deleteId, setDeleteId] = useState(null)

    const fetchData = async () => {
        const [transRes, itemRes, prodRes] = await Promise.all([
            supabase.from('transactions_oil').select('*').order('id'),
            supabase.from('transaction_items_oil').select('*').order('id'),
            supabase.from('products_oil').select('*').order('id')
        ])

        setTransactionDatas(transRes.data)
        setTransactionItems(itemRes.data)
        setOilProducts(prodRes.data)
    }

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }

    const deleteTransactionHandler = async (data, id) => {
        const { error } = await supabase.from("transactions_oil").delete().eq('transaction_id', id)
        const { error2 } = await supabase.from("transaction_items_oil").delete().eq('transaction_id', id)
        if (data.payment_type === "installment"){
            const installmentPlanId = installment_plans.filter(plan => plan.transaction_id === id)[0].installment_id
            const { error3 } = await supabase.from('installment_plans').delete().eq('installment_id', installmentPlanId)
            const { error4 } = await supabase.from('installment_payments').delete().eq('installment_id', installmentPlanId)
            if (!error3 && !error4 ){
                removeTransactions(id)
            }
        } else {
            if (!error && !error2){
                removeTransactions(id)
            }   
        }
    }

    useEffect(() => {
        if (!isFetched){
            fetchData()
        } else {
            setTransactionDatas(transactions)
            setTransactionItems(transaction_items)
        }
    }, [])

    return(
        <div>
            {transactions.map((transaction) => {
                const items = transactionItems.filter(item => item.transaction_id===transaction.transaction_id)

                return (
                    <div key={transaction.transaction_id} className="transaction_container">
                        <div className="transaction_header">
                            <p> 
                                <span className="user"><strong>{transaction.user_id}</strong></span>
                                <span className="transaction_date">{new Date(transaction.transaction_date).toISOString().split('T')[0]}</span>
                                <span className={`${transaction.status}`}>{transaction.status}</span>
                                <span className="transaction_id">{transaction.transaction_id}</span>
                            </p>
                        </div>
                        <div className='transaction_content'>
                            <div className='transaction_items'>
                                {items.map(item => (
                                    <div className="transaction_item" key={item.product_id}>
                                        <img 
                                            src={productsImgData[item.product_id]}
                                            style={{width: "20px"}}
                                        />
                                        <div>
                                            <p className='parMar'><strong>{item.product_name}</strong></p>
                                            <p className='parMar item_price'>{item.quantity} barang x {showInRupiah(item.price)}</p>
                                        </div>
                                    </div>
                                    
                                ))}
                            </div>
                            <div className="total_amount">
                                <p className="parMar">Total Amount: </p>
                                <p className="parMar"><strong>{showInRupiah(transaction.total_amount)}</strong></p>
                                {transaction.level!=0 && (
                                    <div className='reward_container'>
                                        <p className="parMar">Level {transaction.level}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="transaction_footer">
                            <button className="delete-transaction-btn btn" style={{width: "100px"}} onClick={() => setDeleteId(transaction.transaction_id)}>Delete</button>
                            <NavLink className="details_link nav-link btn" style={{width: "100px"}} to={`/my-pages/my-transactions/${transaction.transaction_id}`}>Details</NavLink>
                        </div>
                        {deleteId===transaction.transaction_id && (
                            <div className="delete-confirm-container">
                                <p className='parMar'>Are you sure you want to delete this transaction?</p>
                                <div>
                                    <button className="yes-delete-btn yes-no-btn" onClick={() => deleteTransactionHandler(transaction, transaction.transaction_id)}>Yes</button>
                                    <button className="no-delete-btn yes-no-btn" onClick={() => setDeleteId(null)}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default MyTransactions