import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";
import { NavLink } from "react-router-dom";

// This page function was to create different kind of expenses and the user was supposed to be able to select its value, however because of a change of plans the categories values from the expenses were moved to stay static so the user can go directly to the expense category it had. 
export default function ExpenseForm(props){

    // Access to data and contexts of expenses
    const{id} = props;
    const globalExpensesData = useExpenseData();
    const globalExpensesDispacth = useExpenseDispatch();

    // Data needed for seeding the data into the db and for being able to update its values 
    // const [localExpense, setLocalExpense] = useState({})
    const [localCategory, setLocalCategory] = useState("");
    const [localAmount, setLocalAmount] = useState("");

    // Loops trying to find the correct id of the expense
    useEffect(() => {
        let tempExp = globalExpensesData.find(globalSpecificExpense => {
            return globalSpecificExpense.id === id;
        });

        // Each expense has a category and an amount 
        if(tempExp){
            setLocalCategory(tempExp.category);
            setLocalAmount(tempExp.amount);
        }
    },[globalExpensesData, id]);

    // The new Expense will be saved with a new id or in case it was an update the data will be updated to his respective id/expense 
    const saveExpenseToGlobal = () => {
        let tempNewExpense = {
            id: id || globalExpensesData.length + 1,
            category: localCategory,
            amount: localAmount
        }
        // it will be up to the id if the 'update' or 'create' context is triggered 
        if(id){
            globalExpensesDispacth({type:"update", updatedExpense: tempNewExpense})
        } else {
            globalExpensesDispacth({type:"create", newExpense: tempNewExpense})
        }
    }

    // This piece of code was no longer used at the moment however it can be implemented for more advanced functions for the future of budget manager 
    return(
        <div>
            {/* //Add expenses individually instead of doing it by section  */}
            {/* <form onSubmit={addAmountToExpense}>
                <label>
                    Amount:
                    <input type="text" value={Number(localAmount)} onChange={(event => setLocalAmount(event.target.value))} />
                </label>
                <button type="submit">Add amount</button>
            </form> */}
        {/* <button><NavLink to="/expenses">Back</NavLink></button>
        <br />
        <button onClick={saveExpenseToGlobal} >Save</button> */}
        </div>
    )
}