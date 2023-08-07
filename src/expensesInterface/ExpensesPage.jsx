import ExpenseDisplay from "./ExpDisplay";
import { useExpenseData } from "./ExpContext";
// import ExpenseForm from "./ExpForm";
// import ExpenseParent from "./ExpParent";
// import { NavLink } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import './Expenses.scss'

export default function ExpensesPage(props){
    const globalExpensesData = useExpenseData();


    return(
        <div>
            <h1 className="expensesTitle">Expenses</h1>
            {/* <div></div> */}
            <p className="text" >Expenses this month</p>
            <div>
                {globalExpensesData.map((expense) => {
                    return(
                        <div key={expense.id}>
                            {/* <ExpenseParent id={expense.id} /> */}
                            <ExpenseDisplay id={expense.id} />
                        </div>
                    );
                })}
            </div>
            {/* <button><NavLink to="/addExpense">Add expense</NavLink></button> */}
            {/* <ExpenseForm /> */}
            <Navbar />
        </div>
    )
}