import Header from "../components/Header"
import './MyPages.css'
import { Outlet, NavLink } from "react-router-dom"
import { useTransactionStore } from "../contexts/useTransactionStore"
import { supabase } from "../services/supabase-client"
import { useEffect } from "react"

function MyPages() {
    const { transactions, setTransactions, updateTransactions, addTransactions,
        transaction_items, addTransactionItems,
        installment_plans, updateInstallmentPlans, addInstallmentPlans,
        installment_payments, updateInstallmentPayments, addInstallmentPayments,
        isFetched } = useTransactionStore()
    
    const fetchData = async () => {
        const [transRes, itemsRes, planRes, paymentRes] = await Promise.all([
            supabase.from('transactions_oil').select('*').order('id'),
            supabase.from('transaction_items_oil').select('*').order('id'),
            supabase.from('installment_plans').select('*').order('id'),
            supabase.from('installment_payments').select('*').order('payment_number')
        ])
        setTransactions(transRes.data, itemsRes.data, planRes.data, paymentRes.data)
    }

    useEffect(() => {
        if (!isFetched){
            fetchData()
        } else {
        }
    }, [isFetched])
    
    return (
        <div className="myPages-container">
            <div className="myPages-nav">
                <h2>My pages</h2>
                <NavLink className="nav-link" to="/my-pages/add-product">Add product</NavLink>
                <NavLink className="nav-link" to="/my-pages/list-of-products">List of products</NavLink>
                <NavLink className="nav-link" to="/my-pages/my-transactions">My transactions</NavLink>
            </div>
            <div className="myPages-content">
                <Outlet />
            </div>
        </div>
    )
}

export default MyPages