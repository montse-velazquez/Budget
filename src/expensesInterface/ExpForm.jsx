import { useEffect, useState } from "react";
import { useExpenseData, useExpenseDispatch } from "./ExpContext";
import { NavLink } from "react-router-dom";

export default function ExpenseForm(props){

    const{id} = props;
    const globalExpensesData = useExpenseData();
    const globalExpensesDispacth = useExpenseDispatch();

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
            <form>
                <label>Category</label>
                <select name="categories">
                    <option value={localCategory} onChange={(event) => setLocalCategory(event.target.value)}>Eating Out</option>
                    <option value={localCategory} onChange={(event) => setLocalCategory(event.target.value)}>Groceries</option>
                    <option value={localCategory} onChange={(event) => setLocalCategory(event.target.value)}>Entertainment</option>
                    <option value={localCategory} onChange={(event) => setLocalCategory(event.target.value)}>Subscription</option>
                    <option value={localCategory} onChange={(event) => setLocalCategory(event.target.value)}>Other...</option>
                </select>
                {/* <input type="text" name="category" value={localCategory} onChange={(event) => setLocalCategory(event.target.value)} /> */}
                <br />
                <label>Amount</label>
                <input type="text" name="amount" value={localAmount} onChange={(event) => setLocalAmount(event.target.value)} />
            </form>
        <button><NavLink to="/expenses">Back</NavLink></button>
        <br />
        <button onClick={saveExpenseToGlobal} >Save expense</button>
        </div>
    )
}