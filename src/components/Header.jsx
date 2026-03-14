import './Header.css'
import logo from '../assets/compLogoPc.png'
import cart from '../assets/shopping-cart.png'
import my_page from '../assets/my-page.png'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header({ setSearch }) {
    const [searchResult, setSearchResult] = useState("")

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
                onClick={() => setSearch(searchResult)}
            >Search</button>
            <nav className="nav-bar">
                <NavLink to="/carts">
                    <img src={cart} alt="cart icon" className="nav-carts"/>
                </NavLink>
                <NavLink to="/my-pages">
                    <img src={my_page} alt="my page icon" className="nav-my-page"/>
                </NavLink>
            </nav>
        </header>
    )
}

export default Header