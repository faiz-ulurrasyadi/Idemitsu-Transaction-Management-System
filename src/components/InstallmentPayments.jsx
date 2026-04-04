import { useTransactionStore } from "../contexts/useTransactionStore";
import { useParams, useNavigate } from "react-router-dom";
import './InstallmentPayments.css'

const InstallmentPayments = ({ setViewPayments }) => {
    const navigate = useNavigate()
    const { transaction_id } = useParams()
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

    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }
    const transactionDateHandler = (date) => {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const dateTime = new Date(date)
        const transaction_date = dateTime.toLocaleDateString("en-GB", options)
        return `${transaction_date}`
    }

    return (
        <div className="installment_payments_detail">
            <div className="payment_header">
                <div className="payments_title">
                    <p>Installment Payment Details</p>
                    <button className="close-btn" onClick={() => setViewPayments(null)}>X</button>
                </div>
                <div className="payment_table_header">
                    <p>ID</p>
                    <p>Payment method</p>
                    <p>Amount</p>
                    <p>Due date</p>
                    <p>Status</p>
                </div>
            </div>
            {installmentPayments.map(payment => (
                <div key={payment.payment_id} className="payment_contents">
                    <p>{payment.payment_id.replace(/(\d{11}-)/, "")}</p>
                    <p>Card</p>
                    <p>{showInRupiah(payment.amount)}</p>
                    <p>{transactionDateHandler(new Date(payment.due_date).toISOString())}</p>
                    <p>{payment.status}</p>
                </div>
            ))}
        </div>
    )
}

export default InstallmentPayments