import './Header.css'
import logo from '../assets/compLogoPc.png'
import cart from '../assets/shopping-cart.png'
import my_page from '../assets/my-page.png'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header({ setSearch, cartLists }) {
    const [searchResult, setSearchResult] = useState("")
    const [totalItem, setTotalItem] = useState(0)

    const calcTotalItem = () => {
        let total = 0
        cartLists.forEach(list => {
            total = total + list.quantity
        })
        setTotalItem(total)
    }

    const searchHandler = (searchWords) => {
        const words = searchWords.split(" ")
        setSearch(words)
    }

    useEffect(() => {
        if (cartLists){
            calcTotalItem()
        }
        return
    }, [cartLists])

    return (
        <header className="home-header">
            <NavLink to="/">
                <img className="company-logo" src={logo} alt="Idemitsu logo" />
            </NavLink>
            <input 
                type="text" 
                className="search-box" 
                placeholder="Search..." 
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
            />
            <button 
                className="search-btn"
                onClick={() => searchHandler(searchResult)}
            >Search</button>
            <nav className="nav-bar">
                <NavLink to="/carts" className="carts-nav-box">
                    <div className='cart-icon-total'>{totalItem}</div>
                    <img src={cart} alt="cart icon" className="nav-carts" />
                </NavLink>
                <NavLink to="/my-pages">
                    <img src={my_page} alt="my page icon" className="nav-my-page"/>
                </NavLink>
            </nav>
        </header>
    )
}

export default Header