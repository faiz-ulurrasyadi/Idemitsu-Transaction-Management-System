import { supabase } from '../services/supabase-client'
import { useState, useEffect } from 'react'
import './ListProducts.css'

function ListProducts(){
    const [products, setProducts] = useState([])
    const fetchData = async () => {
        const {error, data} = await supabase.from('products_oil').select('*').order('id', {ascending: true})
        setProducts(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="product-header">
                <p>Product name</p>
                <p>Vehicle type</p>
                <p>Grade</p>
                <p>Transmission</p>
            </div>
            {products.map((product, idx) => (
                <div className="product-container">
                    <p>{product.name}</p>
                    <p>{product.vec_type}</p>
                    <p>{product.quality}</p>
                    <p>{product.transmission}</p>
                </div>
            ))}
        </>
    )
}

export default ListProducts