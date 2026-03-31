import { create } from "zustand";

export const useTransactionStore = create((set) => ({
    transactions: [],
    installment_plans: [],
    installment_payments: [],
    user_id: "test",

    setTransactions: (data) => 
        set((state) => ({
            transactions: [...state.transactions, data]
        })),
    
    removeTransactions: (data) =>
        set((state) => {
            const newData = state.transactions.filter((transaction) => 
                transaction.transaction_id!=data.transaction_id)
            return {
                transactions: newData,
                installment_plans: [...state.installment_plans],
                installment_payments: [...state.installment_payments],
            }
        }),
    
    updateTransactions: (data) =>
        set((state) => {
            transactions: state.transactions.map((transaction) => (
                transaction.transaction_id === data.transaction_id ? 
                {...transaction, ...data} :
                transaction
            ))
        })
}))