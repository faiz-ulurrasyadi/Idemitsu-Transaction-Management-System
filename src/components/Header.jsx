import './Header.css'
import logo from '../assets/compLogoPc.png'
import cart from '../assets/shopping-cart.png'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="home-header">
            <img className="company-logo" src={logo} alt="Idemitsu logo" />
            <input type="text" className="search-box" placeholder="Search..." />
            <nav className="nav-bar">
                <NavLink to="/carts" className="nav-carts">
                    <img src={cart} alt="cart icon" />
                </NavLink>
            </nav>
        </header>
    )
}

export default Header