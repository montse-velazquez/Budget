import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";
import './Expenses.scss'

// The expense display is the function that is on charge of displaying the elements for adding and expenses and save it to his proper category
export default function ExpenseDisplay(props){
    const {id} = props;
    // Data for the local expense
    const [localExpense, setLocalExpense] = useState({});
    // Provides access to data and reducer 
    const globalExpensesData = useExpenseData();
    const globalExpensesDispatch = useExpenseDispatch();
    // Keeps track of effects by finding the id/category of each expense 
    useEffect(() => {
        setLocalExpense(globalExpensesData.find(globalSpecificExpense => {
            return globalSpecificExpense.id === id;
        }));
    },[globalExpensesData, id])

    // ===> At first it was intended to be able to delete expenses but it was decided to be removed as users might decide to delete them and loose track of their real expenses, however the function can be implemented at any time as it works as intended 
    // const deleteExpenseFromExpenses = () => {
    //     let targetExpense = {
    //         id: id
    //     }
    //     ===> The function will delete the expense based on their id
    //     if(id) {
    //         globalExpensesDispatch({type:"deleteExpense", deleteExpense: targetExpense})
    //     } else {
    //         return (
    //             <p>Nothing to delete</p>
    //         )
    //     }
    // }

    // Set data and function for stoting the amount of the localExpense 
    const [localAmount, setLocalAmount] = useState(0);

    // An amount will be added to an specific expense category
    const addAmountToExpense = () => {
        let targetExpense = { 
            // Looks for the right id of the expense, so the typed amount is added to correct category
            id: id,
            amount: localExpense.amount += parseInt(localAmount) //10
        }

        // If the id exist, the data is dispatched to the reducer 
        if(id) {
            globalExpensesDispatch({type:"addAmountToExpense", addAmount: targetExpense})
        } else {
            return (
                <p>Nothing to add</p>
            )
        }
    }

    // The elements that will be rendered are each category with their current amount, plus the form for adding an expense 
    return(
        <div className="container">
            {/* <button className="xbutton" onClick={deleteExpenseFromExpenses}>X</button> */}
            <div className="container2">
            <h4 className="text">{localExpense.category}</h4>
            <h4 className="text">${localExpense.amount}</h4>
            </div>
            <form className="addAmount" onSubmit={addAmountToExpense}>
                <label className="labelExp">
                    Amount:
                    <br />
                    <input className="ExpInput"type="text" value={Number(localAmount)} onChange={(event => setLocalAmount(event.target.value))} />
                </label>
                <button className="ExpButton" type="submit">Add amount</button>
            </form>

        </div>
    )
}