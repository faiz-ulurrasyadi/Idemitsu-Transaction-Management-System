import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Carts from "./pages/Carts.jsx"
import MyPages from "./pages/MyPages.jsx"

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carts" element={<Carts />} />
                <Route path="/my-pages" element={<MyPages />} />
            </Routes>
        </Router>
    </>
  )
}

export default App