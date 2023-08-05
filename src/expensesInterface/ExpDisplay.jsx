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

    return(
        <div>
            <button onClick={deleteExpenseFromExpenses}>X</button>
            <h4>{localExpense.category}</h4>
            <p>{localExpense.amount}</p>

        </div>
    )
}