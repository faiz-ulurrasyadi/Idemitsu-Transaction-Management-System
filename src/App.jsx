import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Carts from "./pages/Carts.jsx"

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carts" element={<Carts />} />
            </Routes>
        </Router>
    </>
  )
}

export default App