import { useState, useEffect } from 'react'
import './TransactionForm.css'
import { useTransactionStore } from '../contexts/useTransactionStore'

function TransactionForm({ transactions, setTransactions }){
    return (
        <div>
            <form className='transaction_form'>
                <div className="two_form_grid_container">
                    <label htmlFor="userId">User ID:</label>
                    <input 
                        type="text" 
                        className='userId_input'
                        id="userId"
                        value={transactions.user_id}
                        onChange={(e) => setTransactions({...transactions, user_id: e.target.value})}
                    />
                    <label htmlFor="checkout_date">Date:</label>
                    <input 
                        type="date" 
                        id="checkout_date" 
                        value={transactions.transaction_date.toISOString().split('T')[0]}
                        onChange={(e) => setTransactions({...transactions, transaction_date: new Date(e.target.value)})}
                    />
                    <label htmlFor="payment_type">Payment type:</label>
                    <select 
                        id="payment_type"
                        name="payment_type"
                        value={transactions.payment_type}
                        onChange={(e) => setTransactions({...transactions, payment_type: e.target.value})}>
                            <option value="full" name="payment_type">full</option>
                            <option value="installment" name="payment_type">installment</option>
                    </select>
                    <label htmlFor="payment_method">Payment method:</label>
                    <select
                        id="payment_method"
                        name="payment_method"
                        value={transactions.payment_method}
                        onChange={(e) => setTransactions({...transactions, payment_method: e.target.value})}
                    >
                        <option value="cash" name="payment_method">cash</option>
                        <option value="transfer" name="payment_method">transfer</option>
                    </select>
                    <label htmlFor="transaction_status">Payment status:</label>
                    <select 
                        id="transaction_status" 
                        name="transaction_status"
                        value={transactions.status}
                        onChange={(e) => setTransactions({...transactions, status: e.target.value})}
                    >
                        <option value="pending" name="transaction_status">pending</option>
                        <option value="paid" name="transaction_status">paid</option>
                        <option value="partial" name="transaction_status">partial</option>
                        <option value="failed" name="transaction_status">failed</option>
                    </select>
                </div>
                {transactions.payment_type === "installment" && (
                    <div className='total_installments_container'>
                        <label htmlFor="total_installments">Total installments:</label>
                        <select
                            id="total_installments"
                            name="total_installments"
                            value={transactions.total_installments}
                            onChange={(e) => setTransactions({...transactions, total_installments: parseInt(e.target.value)})}
                        >
                            <option value="3" name="total_installments">3x</option>
                            <option value="6" name="total_installments">6x</option>
                            <option value="12" name="total_installments">12x</option>
                        </select>
                    </div>
                    )}
                <label htmlFor="transaction_notes">Notes:</label>
                <textarea id="transaction_notes" rows="10" onChange={(e) => setTransactions({...transactions, notes: e.target.value})}></textarea>
            </form>
        </div>
    )
}

export default TransactionForm