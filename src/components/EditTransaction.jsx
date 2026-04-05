import './EditTransaction.css'
import { useTransactionStore } from '../contexts/useTransactionStore'

const EditTransaction = ({ setEditId }) => {
    const { transactions, setTransactions, updateTransactions, addTransactions, removeTransactions,
        transaction_items, addTransactionsItems,
        installment_plans, updateInstallmentPlans, addInstallmentPlans,
        installment_payments, updateInstallmentPayments, addInstallmentPayments,
        isFetched } = useTransactionStore()
    
    return (
        <div className="edit_transaction_container">
            <p>Edit Transaction</p>
            <button onClick={() => setEditId(null)}>Back</button>
        </div>
    )
}

export default EditTransaction