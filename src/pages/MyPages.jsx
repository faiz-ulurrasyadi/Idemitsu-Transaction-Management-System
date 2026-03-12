import Header from "../components/Header"
import './MyPages.css'
import { Outlet, NavLink } from "react-router-dom"

function MyPages() {
    return (
        <div>
            <Header />
            <div className="myPages-container">
                <div className="myPages-nav">
                    <h2>My pages</h2>
                    <NavLink className="nav-link" to="/my-pages/add-product">Add product</NavLink>
                    <NavLink className="nav-link" to="/my-pages/list-of-products">List of products</NavLink>
                </div>
                <div className="myPages-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyPages