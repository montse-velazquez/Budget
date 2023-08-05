import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";

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

    const deleteExpenseFromExpenses = () => {
        let targetExpense = {
            id: id
        }
        if(id) {
            globalExpensesDispatch({type:"deleteExpense", deleteExpense: targetExpense})
        } else {
            return (
                <p>Nothing to delete</p>
            )
        }
    }

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
        <div>
            <button onClick={deleteExpenseFromExpenses}>X</button>
            <h4>{localExpense.category}</h4>
            <p>{localExpense.amount}</p>
            <form onSubmit={addAmountToExpense}>
                <label>
                    Amount:
                    <input type="text" value={Number(localAmount)} onChange={(event => setLocalAmount(event.target.value))} />
                </label>
                <button type="submit">Add amount</button>
            </form>

        </div>
    )
}