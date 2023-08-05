import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";
import { NavLink } from "react-router-dom";

export default function ExpenseForm(props){

    const{id} = props;
    const globalExpensesData = useExpenseData();
    const globalExpensesDispacth = useExpenseDispatch();

    // const [localExpense, setLocalExpense] = useState({})
    const [localCategory, setLocalCategory] = useState("");
    const [localAmount, setLocalAmount] = useState("");

    useEffect(() => {
        let tempExp = globalExpensesData.find(globalSpecificExpense => {
            return globalSpecificExpense.id === id;
        });

        if(tempExp){
            setLocalCategory(tempExp.category);
            setLocalAmount(tempExp.amount);
        }
    },[globalExpensesData, id]);

    const saveExpenseToGlobal = () => {
        let tempNewExpense = {
            id: id || globalExpensesData.length + 1,
            category: localCategory,
            amount: localAmount
        }

        if(id){
            globalExpensesDispacth({type:"update", updatedExpense: tempNewExpense})
        } else {
            globalExpensesDispacth({type:"create", newExpense: tempNewExpense})
        }
    }

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
        <button><NavLink to="/expenses">Back</NavLink></button>
        <br />
        <button onClick={saveExpenseToGlobal} >Save</button>
        </div>
    )
}