import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialExpensesData = [
    {
        id: 1,
        category: "Groceries",
        amount: 25
    },
    {
        id: 2,
        category: "Eating Out",
        amount: 25
    }
]

const expenseReducer = (previousState, instruction) => {
    let stateEditable = [...previousState];

    switch(instruction.type) {
        case "setup":
            console.log("Apply persistent data");
            let localStorageData = instruction.addData;
            stateEditable = localStorageData;
            return stateEditable;

        case "create":
            console.log("Create expense");
            let newExpense = instruction.newExpense;
            stateEditable.push(newExpense);
            return stateEditable;
        
        case "update":
            console.log("Edit expense");

            let targetExpenseIndex = stateEditable.findIndex(globalSpecificExpense => {
                return globalSpecificExpense.id === instruction.updatedExpense.id;
            })

            stateEditable[targetExpenseIndex] = instruction.updatedExpense;
            return stateEditable;

        case 'deleteExpense' : {
            let indexToRemove = stateEditable.findIndex(globalSpecificExpense => {
                return globalSpecificExpense.id === instruction.deleteExpense.id;
            })
    
            stateEditable.splice(indexToRemove, 1);
            return stateEditable;
        }
        
        default: 
            console.log("Invalid instruction, you tried: " + instruction.type);
            return previousState;
    }
}

export const ExpenseDataContext = createContext(null);
export const ExpenseDispatchContext = createContext(null);

// Function provides access to a single part of the ExpenseReducer
export function useExpenseData(){
    return useContext(ExpenseDataContext);
}

// Function used to modify data:
export function useExpenseDispatch(){
    return useContext(ExpenseDispatchContext);
}

export default function ExpenseProvider(props){
    const [expenseData, expenseDispatch] = useReducer(expenseReducer, initialExpensesData);

    const [persistentData, setPeristentData] = useLocalStorage('expenses', initialExpensesData);

    useEffect(() => {
        expenseDispatch({type:"setup", addData:persistentData});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("Local Storage: " + persistentData);
    }, [persistentData]);

    useEffect(() => {
        setPeristentData(expenseData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[expenseData]);

    return(
        <ExpenseDataContext.Provider value={expenseData}>
            <ExpenseDispatchContext.Provider value={expenseDispatch}>
                {props.children}
            </ExpenseDispatchContext.Provider>
        </ExpenseDataContext.Provider>
    )
}
