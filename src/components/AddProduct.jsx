import { useState, useEffect } from "react"
import './AddProduct.css'
import { supabase } from '../services/supabase-client'
import CurrencyInput from 'react-currency-input-field'

function AddProduct(){
    const [productData, setProductData] = useState({
        product_id: "",
        name: "",
        vec_type: "",
        transmission: "",
        quality: "",
        price: 0,
        dec: "",
        stock: 0,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error} = await supabase.from('products_oil').insert(productData).single()
        setProductData({
            product_id: "",
            name: "",
            vec_type: "",
            transmission: "",
            quality: "",
            price: 0,
            dec: "",
            stock: 0,
        })
    }

    useEffect(() => {

    }, [productData])

    return (
        <div>
            <form className="add-product-container" onSubmit={handleSubmit}>
                <label htmlFor="product-id">Product id:</label>
                <input 
                    type="text"
                    id="product-id"
                    value={productData.product_id}
                    onChange={(e) => setProductData({...productData, product_id: e.target.value})}
                />
                <label htmlFor="product-name">Product name:</label>
                <input 
                    type="text"
                    id="product-name"
                    value={productData.name}
                    onChange={(e) => setProductData({...productData, name: e.target.value})}
                />
                <p style={{margin: "0px"}}>Vehicle type:</p>
                <div className="vec-type-choices">
                    <label htmlFor="R2">
                        <input 
                            id="R2" 
                            name="vec_type" 
                            value="R2" 
                            type="radio" 
                            checked={productData.vec_type === "R2"} 
                            onChange={(e) => setProductData({...productData, vec_type: "R2"})}/>
                            two wheelers
                    </label>
                    <label htmlFor="R4">
                        <input 
                            id="R4" 
                            name="vec_type" 
                            value="R4" 
                            type="radio"
                            checked={productData.vec_type === "R4"} 
                            onChange={(e) => setProductData({...productData, vec_type: "R4"})}/>
                            four wheelers
                    </label>
                </div>
                <p style={{margin: "0px"}}>Transmission type:</p>
                <div className="transmission-type-choices">
                    <label htmlFor="auto">
                        <input 
                            id="auto" 
                            name="transmission_type" 
                            value="auto" 
                            type="radio"
                            onChange={(e) => setProductData({...productData, transmission: "auto"})}
                        />automatic
                    </label>
                    <label htmlFor="manual">
                        <input 
                            id="manual" 
                            name="transmission_type" 
                            value="manual" 
                            type="radio"
                            onChange={(e) => setProductData({...productData, transmission: "manual"})}
                        />manual
                    </label>
                </div>
                <p style={{margin: "0px"}}>Oil grade:</p>
                <div className="oil-type-choices">
                    <label htmlFor="high">
                        <input 
                            id="high" 
                            name="oil-grade" 
                            value="high" 
                            type="radio"
                            onChange={(e) => setProductData({...productData, quality: "high"})}
                        />high
                    </label>
                    <label htmlFor="mid">
                        <input 
                            id="mid" 
                            name="oil-grade" 
                            value="mid" 
                            type="radio"
                            onChange={(e) => setProductData({...productData, quality: "mid"})}
                        />mid
                    </label>
                    <label htmlFor="standard">
                        <input 
                            id="standard" 
                            name="oil-grade" 
                            value="standard" 
                            type="radio"
                            onChange={(e) => setProductData({...productData, quality: "standard"})}
                        />standard
                    </label>
                </div>
                <label htmlFor="price">Price:</label>
                <CurrencyInput
                    id="price"
                    prefix="Rp "
                    decimalsLimit={0}
                    groupSeparator="."
                    decimalSeparator=","
                    onValueChange={(e) => setProductData({...productData, price: e})}
                />
                <label htmlFor="dec">Description:</label>
                <textarea 
                    id="dec" 
                    rows="10"
                    onChange={(e) => setProductData({...productData, dec: e.target.value})}
                >
                </textarea>
                <label htmlFor="stock">Stock:</label>
                <input 
                    type="number"
                    id="stock"
                    value={productData.stock}
                    onChange={(e) => setProductData({...productData, stock: e.target.value})}
                />
                <button className="add-product-btn" type="submit">Add product</button>
                <p>{productData.product_id}-
                    {productData.name}-
                    {productData.vec_type}-
                    {productData.transmission}-
                    {productData.quality}-
                    {productData.price}-
                    {productData.dec}-
                    {productData.stock}
                </p>
            </form>
        </div>
    )
}

export default AddProduct