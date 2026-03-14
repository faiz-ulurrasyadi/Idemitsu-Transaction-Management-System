import './Products.css'
import { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { supabase } from '../services/supabase-client'
import { productsImgData } from '../assets/productsImg'

function Products({ search, getCartList }) {
    const [filter, setFilter] = useState({
        vecType: "all",
        transmission: "all",
        oilGrade: "all",
        minPrice: 0,
        maxPrice: 0,
    })
    const arr = ["fff", "awe", "dafh"]

    const [products, setProducts] = useState([])

    const fetchData = async () => {
        const { error, data } = await supabase.from('products_oil').select('*').order('id', {ascending: true})
        setProducts(data)
        getCartList(arr)
    }
    const showInRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="products-component">
            <div className="filter-box">
                <h2>Filtering conditions:</h2>
                <form>
                    <div className="vec_type">
                        <p>Vehicle type:</p>
                        <ul style={{listStyle: "none", padding: 0}}>
                            <li>
                                <label htmlFor="all">
                                    <input type="radio" id="all" name="vec_type" value="all" onChange={() => setFilter({...filter, vecType: "all"})} checked={filter.vecType === "all"} />
                                    All
                                </label>
                            </li>
                            <li>
                                <label htmlFor="2 wheelers">
                                    <input type="radio" id="2 wheelers" name="vec_type" value="2W" onChange={() => setFilter({...filter, vecType: "2W"})} checked={filter.vecType === "2W"} />
                                    2 W
                                </label>
                            </li>
                            <li>
                                <label htmlFor="4 wheelers">
                                    <input type="radio" id="4 wheelers" name="vec_type" value="4W" onChange={() => setFilter({...filter, vecType: "4W"})} checked={filter.vecType === "4W"} />
                                    4 W
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="transmission-type">
                        <p>Transmission type:</p>
                        <ul  style={{listStyle: "none", padding: 0}}>
                            <li>
                                <label htmlFor="all">
                                    <input type="radio" id="all" name="transmission" value="all" onChange={() => setFilter({...filter, transmission: "all"})} checked={filter.transmission === "all"} />
                                    All
                                </label>
                            </li>
                            <li>
                                <label htmlFor="manual">
                                    <input type="radio" id="manual" name="transmission" value="manual" onChange={() => setFilter({...filter, transmission: "manual"})} checked={filter.transmission === "manual"} />
                                    Manual
                                </label>
                            </li>
                            <li>
                                <label htmlFor="automatic">
                                    <input type="radio" id="automatic" name="transmission" value="automatic" onChange={() => setFilter({...filter, transmission: "automatic"})} checked={filter.transmission === "automatic"} />
                                    Automatic
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="oil-grade">
                        <p>Oil grade:</p>
                        <ul  style={{listStyle: "none", padding: 0}}>
                            <li>
                                <label htmlFor="all">
                                    <input type="radio" id="all" name="oil_grade" value="all" onChange={() => setFilter({...filter, oilGrade: "all"})} checked={filter.oilGrade === "all"} />
                                    All
                                </label>
                            </li>
                            <li>
                                <label htmlFor="high">
                                    <input type="radio" id="high" name="oil_grade" value="high" onChange={() => setFilter({...filter, oilGrade: "high"})} checked={filter.oilGrade === "high"} />
                                    High
                                </label>
                            </li>
                            <li>
                                <label htmlFor="mid">
                                    <input type="radio" id="mid" name="oil_grade" value="mid" onChange={() => setFilter({...filter, oilGrade: "mid"})} checked={filter.oilGrade === "mid"} />
                                    Mid
                                </label>
                            </li>
                            <li>
                                <label htmlFor="standard">
                                    <input type="radio" id="standard" name="oil_grade" value="standard" onChange={() => setFilter({...filter, oilGrade: "standard"})} checked={filter.oilGrade === "standard"} />
                                    Standard
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="price-range">
                        <p>Price:</p>
                        <div className="price-range-input-container">
                            <label htmlFor="minPrice">min: </label>
                            <CurrencyInput
                                prefix="Rp "
                                decimalsLimit={0}
                                groupSeparator="."
                                decimalSeparator=","
                                onValueChange={(value) => setFilter({...filter, minPrice: value})}
                            />
                            <label htmlFor="maxPrice">max: </label>
                            <CurrencyInput
                                prefix="Rp "
                                decimalsLimit={0}
                                groupSeparator="."
                                decimalSeparator=","
                                onValueChange={(value) => setFilter({...filter, maxPrice: value})}
                            />
                        </div>
                    </div>
                </form>
                <h2>result: {filter.vecType} {filter.transmission} {filter.oilGrade} {filter.minPrice}</h2>
                <button className="filter-btn">Apply filter</button>
            </div>
            <div className="products-container">
                {products.map((product, idx) => (
                    <>
                        <div className="product-card" key={product.product_id}>
                            <img className="product-img" src={productsImgData[product.product_id]} />
                            <p>{product.name}</p>
                            <p>{showInRupiah(product.price)}</p>
                            <div className="product-overlay">
                                <p className="product-dec">{product.dec}</p>
                                <div className="product-btn">
                                    <button className="addToCart-btn">Add to cart</button>
                                    <button className="detailProduct-btn">More details</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Products