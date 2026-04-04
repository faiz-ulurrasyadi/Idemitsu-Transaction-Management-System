import { supabase } from '../services/supabase-client'
import { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field'
import './ListProducts.css'
import { useProductStore } from '../contexts/useProductStore'

function ListProducts(){
    // const [products, setProducts] = useState([])
    const [editedProducts, setEditedProducts] = useState({})
    const [editingId, setEditingId] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const { products, setProducts, addProduct, 
        updateProduct, removeProduct, isFetched } = useProductStore()

    const fetchData = async () => {
        const {error, data} = await supabase.from('products_oil').select('*').order('id', {ascending: true})
        setProducts(data)
    }
    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(amount)
    }
    const submitEditHandle = async (e) => {
        e.preventDefault()
        const {error} = await supabase.from('products_oil').update(editedProducts).eq("product_id", editedProducts.product_id)
        updateProduct(editedProducts)
        setEditedProducts({
            product_id: "",
            name: "",
            vec_type: "",
            transmission: "",
            quality: "",
            price: 0,
            dec: "",
            stock: 0,
        })
        setEditingId(null)
    }
    const deleteList = async (id) => {
        const { error } = await supabase.from("products_oil").delete().eq('product_id', id)
        removeProduct(id)
        // if (!error){
        //     fetchData()
        // }
        setDeleteId(null)
    }

    useEffect(() => {
        if(!isFetched){
            fetchData()
        }
    }, [editedProducts, products])

    return (
        <div className="product-list-container">
            <div className="product-header">
                <p>Product name</p>
                <p>Wheel</p>
                <p>Grade</p>
                <p>Trans</p>
                <p>Price</p>
                <div></div>
            </div>
            {products.map((product, idx) => (
            <div key={product.product_id}>
                <div className="product-container">
                    <p>{product.product_id}</p>
                    <p style={{textAlign: "center"}}>{product.vec_type}</p>
                    <p style={{textAlign: "center"}}>{product.quality}</p>
                    <p style={{textAlign: "center"}}>{product.transmission}</p>
                    <p style={{textAlign: "right", paddingRight: "5px"}}>{showInRupiah(product.price)}</p>
                    <div className="action-lists-btns">
                        <button className="edit-btn" onClick={() => {
                            setEditingId(product.product_id)
                            setEditedProducts(product)
                        }}>✏️</button>
                        <button className="delete-btn" onClick={() => {
                            setDeleteId(product.product_id)
                        }}>🗑</button>

                    </div>
                </div>
                {editingId === product.product_id && (
                    <form className="edit-product-container" onSubmit={submitEditHandle}>
                        <label htmlFor="product-id">Product id:</label>
                        <input 
                            type="text"
                            id="product-id"
                            value={editedProducts.product_id}
                            onChange={(e) => setEditedProducts({...editedProducts, product_id: e.target.value})}
                        />
                        <label htmlFor="product-name">Product name:</label>
                        <input 
                            type="text"
                            id="product-name"
                            value={editedProducts.name}
                            onChange={(e) => setEditedProducts({...editedProducts, name: e.target.value})}
                        />
                        <p style={{margin: "0px"}}>Vehicle type:</p>
                        <div className="vec-type-choices">
                            <label htmlFor="2W">
                                <input 
                                    id="2W" 
                                    name="vec_type" 
                                    value="2W" 
                                    type="radio" 
                                    checked={editedProducts.vec_type === "2W"} 
                                    onChange={(e) => setEditedProducts({...editedProducts, vec_type: "2W"})}/>
                                    2W
                            </label>
                            <label htmlFor="4W">
                                <input 
                                    id="4W" 
                                    name="vec_type" 
                                    value="4W" 
                                    type="radio"
                                    checked={editedProducts.vec_type === "4W"} 
                                    onChange={(e) => setEditedProducts({...editedProducts, vec_type: "4W"})}/>
                                    4W
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
                                    checked={editedProducts.transmission == "auto"}
                                    onChange={(e) => setEditedProducts({...editedProducts, transmission: "auto"})}
                                />automatic
                            </label>
                            <label htmlFor="manual">
                                <input 
                                    id="manual" 
                                    name="transmission_type" 
                                    value="manual" 
                                    type="radio"
                                    checked={editedProducts.transmission == "manual"}
                                    onChange={(e) => setEditedProducts({...editedProducts, transmission: "manual"})}
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
                                    checked={editedProducts.quality == "high"}
                                    onChange={(e) => setEditedProducts({...editedProducts, quality: "high"})}
                                />high
                            </label>
                            <label htmlFor="mid">
                                <input 
                                    id="mid" 
                                    name="oil-grade" 
                                    value="mid" 
                                    type="radio"
                                    checked={editedProducts.quality == "mid"}
                                    onChange={(e) => setEditedProducts({...editedProducts, quality: "mid"})}
                                />mid
                            </label>
                            <label htmlFor="standard">
                                <input 
                                    id="standard" 
                                    name="oil-grade" 
                                    value="standard" 
                                    type="radio"
                                    checked={editedProducts.quality == "standard"}
                                    onChange={(e) => setEditedProducts({...editedProducts, quality: "standard"})}
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
                            onValueChange={(e) => setEditedProducts({...editedProducts, price: e})}
                        />
                        <label htmlFor="dec">Description:</label>
                        <textarea 
                            id="dec" 
                            rows="10"
                            onChange={(e) => setEditedProducts({...editedProducts, dec: e.target.value})}
                        >
                        </textarea>
                        <label htmlFor="stock">Stock:</label>
                        <input 
                            type="number"
                            id="stock"
                            value={editedProducts.stock}
                            onChange={(e) => setEditedProducts({...editedProducts, stock: e.target.value})}
                        />
                        <div>
                            <button type="submit">Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                    </form>)}
            </div>))}
            {(deleteId) && (
            <div className="delete-list-container">
                <p style={{marginTop: "0px"}}>Are you sure you want to remove from list?</p>
                <div>
                    <button className='yes-remove-list' onClick={() => deleteList(deleteId)}>yes</button>
                    <button className='no-remove-list' onClick={() => setDeleteId(null)}>no</button>
                </div>
            </div>)}
        </div>
    )
}

export default ListProducts