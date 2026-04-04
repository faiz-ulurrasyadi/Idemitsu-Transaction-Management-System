import { create } from "zustand";

export const useTransactionStore = create((set) => ({
    transactions: [],
    transaction_items: [],
    installment_plans: [],
    installment_payments: [],
    user_id: "test",
    isFetched: false,

    setTransactions: (transactions, transactionItems,installmentPlans, installmentPayments) => 
        set((state) => ({
            transactions: transactions? transactions: state.transactions,
            transaction_items: transactionItems? transactionItems: state.transactionItems,
            installment_plans: installmentPlans? installmentPlans: state.installmentPlans,
            installment_payments: installmentPayments? installmentPayments: state.installmentPayments,
            isFetched: true,
        })),
    removeTransactions: (id) =>
        set((state) => {
            const deletedTransaction = state.transactions.filter(transaction => transaction.transaction_id === id)
            let installment_plan_id = null
            if (deletedTransaction.payment_type === "installment"){
                const deletedInstallmentPlan = state.installment_plans.filter(plan => plan.transaction_id === id)[0]
                installment_plan_id = deletedInstallmentPlan.installment_id
            }

            return {
                transactions: state.transactions.filter((transaction) => 
                    transaction.transaction_id!=id),
                transaction_items: state.transaction_items.filter(item => 
                    item.transaction_id!=id),
                installment_plans: installment_plan_id ? 
                    state.installment_plans.filter(plan => plan.transaction_id!=id): [...state.installment_plans],
                installment_payments: installment_plan_id ?
                    state.installment_payments.filter(payment => payment.installment_id!=installment_plan_id) : [...state.installment_payments],
            }
        }),

    updateTransactions: (data) =>
        set((state) => ({
            transactions: state.transactions.map((transaction) => (
                transaction.transaction_id === data.transaction_id ? 
                {...transaction, ...data} : transaction
            ))
        })),
    addTransactions: (data) => 
        set((state) => ({
            transactions: [...state.transactions, data]
        })),
    
    addTransactionsItems: (data) => 
        set((state) => ({
            transaction_items: [...state.transaction_items, data]
        })),
    
    updateInstallmentPlans: (data) => 
        set((state) => ({
            installment_plans: state.installment_plans.map((plan) => (
                plan.installment_id === data.installment_id ?
                {...plan, ...data} : plan
            ))
        })),
    addInstallmentPlans: (data) => 
        set((state) => ({
            installment_plans: [...state.installment_plans, data]
        })),
    
    updateInstallmentPayments: (data) => 
        set((state) => ({
            installment_payments: state.installment_payments.map((payment) => (
                payment.payment_id === data.payment_id ?
                {...payment, ...data} : payment
            ))
        })),
    addInstallmentPayments: (data) => 
        set((state) => ({
            installment_payments: [...state.installment_payments, data]
        })),
        
}))