import { useEffect, useState } from "react";
import { useExpenseData } from "./ExpContext";

export default function ExpenseDisplay(props){
    const {id} = props;
    const [localExpense, setLocalExpense] = useState({});

    const globalExpensesData = useExpenseData();

    useEffect(() => {
        setLocalExpense(globalExpensesData.find(globalSpecificExpense => {
            return globalSpecificExpense.id === id;
        }));
    },[globalExpensesData, id])

    return(
        <div>
            <h4>{localExpense.category}</h4>
            <p>{localExpense.amount}</p>

        </div>
    )
}