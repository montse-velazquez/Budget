import ExpenseDisplay from "./ExpDisplay";
import { useExpenseData } from "./ExpContext";
// import ExpenseForm from "./ExpForm"; {!: change of plans}
// import ExpenseParent from "./ExpParent"; {!: change of plans}
import { Navbar } from "../components/Navbar";
import './Expenses.scss'

// This Expenses Page is going to render the main route, wehre we are goin to be able to see all expenses and amount
export default function ExpensesPage(props){
    const globalExpensesData = useExpenseData();


    return(
        <div>
            <h1 className="expensesTitle">Expenses</h1>
            {/* <div></div> */}
            <p className="text" >Expenses this month</p>
            <div>
                {/* We map through every existent expense that has been saved */}
                {globalExpensesData.map((expense) => {
                    return(
                        <div key={expense.id}>
                            {/* <ExpenseParent id={expense.id} /> */}
                            <ExpenseDisplay id={expense.id} />
                        </div>
                    );
                })}
            </div>
            <Navbar />
        </div>
    )
}