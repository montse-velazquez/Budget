import { NavLink } from "react-router-dom";

export function Navbar(props) {

    let activeNavStyle ={
        textDecorationColor: "green"
    }

    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/goals" style={({isActive}) => isActive ? activeNavStyle : undefined} >Goals</NavLink>
                </li>
                <li>
                    <NavLink to="/expenses" style={({isActive}) => isActive ? activeNavStyle : undefined} >Expenses</NavLink>
                </li>
                <li>
                    <NavLink to="/bills" style={({isActive}) => isActive ? activeNavStyle : undefined} >Bills</NavLink>
                </li>
            </ul>
        </nav>
    )
}

