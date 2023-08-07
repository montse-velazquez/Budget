import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";
import './Expenses.scss'

export default function ExpenseDisplay(props){
    const {id} = props;
    const [localExpense, setLocalExpense] = useState({});

    const globalExpensesData = useExpenseData();
    const globalExpensesDispatch = useExpenseDispatch();

    useEffect(() => {
        setLocalExpense(globalExpensesData.find(globalSpecificExpense => {
            return globalSpecificExpense.id === id;
        }));
    },[globalExpensesData, id])

    // const deleteExpenseFromExpenses = () => {
    //     let targetExpense = {
    //         id: id
    //     }
    //     if(id) {
    //         globalExpensesDispatch({type:"deleteExpense", deleteExpense: targetExpense})
    //     } else {
    //         return (
    //             <p>Nothing to delete</p>
    //         )
    //     }
    // }

    const [localAmount, setLocalAmount] = useState(0);

    const addAmountToExpense = () => {
        let targetExpense = { 
            id: id,
            amount: localExpense.amount += parseInt(localAmount) //10
        }

        if(id) {
            globalExpensesDispatch({type:"addAmountToExpense", addAmount: targetExpense})
        } else {
            return (
                <p>Nothing to add</p>
            )
        }
    }

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