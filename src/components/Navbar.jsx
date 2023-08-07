import { NavLink } from "react-router-dom";
import './Navbar.scss'

export function Navbar(props) {

    return(
        <nav className="navbar">
                    <NavLink to="/goals" >Goals</NavLink>
                    <NavLink to="/expenses" >Expenses</NavLink>
                    <p>Budget Manager</p>
                    <NavLink to="/bills" >Bills</NavLink>
                    <NavLink>Money In/Out</NavLink>
        </nav>
    )
}

