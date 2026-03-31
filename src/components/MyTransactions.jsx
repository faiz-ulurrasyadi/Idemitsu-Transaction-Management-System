import './MyTransactions.css'
import { supabase } from '../services/supabase-client'
import { useState, useEffect } from 'react'
import { productsImgData } from '../assets/productsImg'

function MyTransactions(){
    const [transactionDatas, setTransactionDatas] = useState([])
    const [transactionItems, setTransactionItems] = useState([])
    const [oilProducts, setOilProducts] = useState([])

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

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div>
            {transactionDatas.map((transaction) => {
                const items = transactionItems.filter(item => item.transaction_id===transaction.transaction_id)

                return (
                    <div key={transaction.transaction_id} className="transaction_container">
                        <div className="transaction_header">
                            <p> 
                                <span className="user"><strong>{transaction.user_id}</strong></span>
                                <span className="transaction_date">{transaction.transaction_date.split('T')[0]}</span>
                                <span className={`${transaction.status}`}>{transaction.status}</span>
                                <span className="transaction_id">{transaction.transaction_id}</span>
                            </p>
                        </div>
                        <div className='transaction_content'>
                            <div className='transaction_items'>
                                {items.map(item => (
                                    <div className="transaction_item">
                                        <img 
                                            src={productsImgData[item.product_id]}
                                            style={{width: "20px"}}
                                        />
                                        <div>
                                            <p className='parMar'><strong>{item.product_name}</strong></p>
                                            <p className='parMar'>{item.quantity} barang x {showInRupiah(item.price)}</p>
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
                    </div>
                )
            })}
        </div>
    )
}

export default MyTransactions