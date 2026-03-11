import './Products.css'
import { useState, useEffect } from 'react'

function Products({ search }) {
    const [vecType, setVecType] = useState("all")

    return (
        <div className="products-component">
            <div className="filter-box">
                <h2>Filtering conditions:</h2>
                <form>
                    <div className="vec_type">
                        <p>Vehicle type:</p>
                        <label htmlFor="all">
                            <input type="radio" id="all" name="vec_type" value="all" onChange={() => setVecType("all")} checked={vecType === "all"} />
                            All
                        </label>
                        <label htmlFor="2 wheelers">
                            <input type="radio" id="2 wheelers" name="vec_type" value="2W" onChange={() => setVecType("2W")} checked={vecType === "2W"} />
                            2 W
                        </label>
                        <label htmlFor="4 wheelers">
                            <input type="radio" id="4 wheelers" name="vec_type" value="4W" onChange={() => setVecType("4W")} checked={vecType === "4W"} />
                            4 W
                        </label>
                    </div>
                    <div className="transmission-type">
                        <p>Transmission type:</p>
                        <label htmlFor="all">
                            <input type="radio" id="all" name="transmission" value="all" />
                            All
                        </label>
                        <label htmlFor="manual">
                            <input type="radio" id="manual" name="transmission" value="manual" />
                            Manual
                        </label>
                        <label htmlFor="automatic">
                            <input type="radio" id="automatic" name="transmission" value="automatic" />
                            Automatic
                        </label>
                    </div>
                    <div className="oil-grade">
                        <p>Oil grade:</p>
                        <label htmlFor="all">
                            <input type="radio" id="all" name="oil_grade" value="all" />
                            All
                        </label>
                        <label htmlFor="high">
                            <input type="radio" id="high" name="oil_grade" value="high" />
                            High
                        </label>
                        <label htmlFor="mid">
                            <input type="radio" id="mid" name="oil_grade" value="mid" />
                            Mid
                        </label>
                        <label htmlFor="standard">
                            <input type="radio" id="standard" name="oil_grade" value="standard" />
                            Standard
                        </label>
                    </div>
                </form>
                <h2>result: {vecType}</h2>
            </div>
            <div className="products-container">
                <h2>Products box</h2>
                <p>Search result: {search}</p>
            </div>
        </div>
    )
}

export default Products