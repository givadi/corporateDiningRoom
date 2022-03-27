import logo from './logo.svg'
import './App.css'
import { Cart } from './Cart'
import { Dish } from './Dish'
import { Employee } from './Employee'
import { Order } from './Order'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h1 className="d-flex justify-content-center m-3">
          Corporate Dining Room
        </h1>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/dish">
                Dish
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/order"
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/dish" element={<Dish />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/order" element={<Order />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
