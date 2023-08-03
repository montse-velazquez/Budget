import ExpenseDisplay from "./ExpDisplay";
import { useExpenseData } from "./ExpContext";
import ExpenseForm from "./ExpForm";
import ExpenseParent from "./ExpParent";
import { NavLink } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function ExpensesPage(props){
    const globalExpensesData = useExpenseData();


    return(
        <div>
            <h1>Expenses</h1>
            {/* <div></div> */}
            <p>Expenses this month</p>
                {globalExpensesData.map((expense) => {
                    return(
                        <div key={expense.id}>
                            <ExpenseParent id={expense.id} />
                            {/* <ExpenseDisplay id={expense.id} /> */}
                        </div>
                    );
                })}
            <button><NavLink to="/addExpense">Add expense</NavLink></button>
            {/* <ExpenseForm /> */}
            <Navbar />
        </div>
    )
}