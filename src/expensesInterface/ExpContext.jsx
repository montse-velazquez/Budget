import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

// Hard coded data as MongoDB was unsuccesful to connect, still troubleshooting in the meantime 
const initialExpensesData = [
    {
        id: 1,
        category: "Groceries",
        amount: 0
    },
    {
        id: 2,
        category: "Eating Out",
        amount: 0
    },
    {
        id: 3,
        category: "Entertainment",
        amount: 0
    },
    {
        id: 4,
        category: "Going Out",
        amount: 0
    },
    {
        id: 5,
        category: "Other",
        amount: 0
    }
]

// Create Expenses Reducer with CRUD actions like, creating, adding, updating and deleting expenses 
const expenseReducer = (previousState, instruction) => {
    let stateEditable = [...previousState];

    // Swicth case for selecting the proper reducer based on the actiion that was sent from the different created functions
    switch(instruction.type) {
        // sets up the hard coded data 
        case "setup":
            console.log("Apply persistent data");
            let localStorageData = instruction.addData;
            stateEditable = localStorageData;
            return stateEditable;
        // Creates expenses
        case "create":
            console.log("Create expense");
            let newExpense = instruction.newExpense;
            stateEditable.push(newExpense);
            return stateEditable;
        // Updates expenses
        case "update":
            console.log("Edit expense");

            let targetExpenseIndex = stateEditable.findIndex(globalSpecificExpense => {
                return globalSpecificExpense.id === instruction.updatedExpense.id;
            })

            stateEditable[targetExpenseIndex] = instruction.updatedExpense;
            return stateEditable;
        // Deletes expenses
        case 'deleteExpense' : {
            let indexToRemove = stateEditable.findIndex(globalSpecificExpense => {
                return globalSpecificExpense.id === instruction.deleteExpense.id;
            })
    
            stateEditable.splice(indexToRemove, 1);
            return stateEditable;
        }
        // Add the introduced amount to the specific expense
        case 'addAmountToExpense': {
            let indexToAdd = stateEditable.findIndex(globalSpecificExpense => {
                return globalSpecificExpense.id === instruction.addAmount.id;
            })
            stateEditable[indexToAdd].amount = instruction.addAmount.amount;
            return stateEditable;
        }
        // As a default in case there is a wrong instruction
        default: 
            console.log("Invalid instruction, you tried: " + instruction.type);
            return previousState;
    }
}

// exports data and reducer 
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

// provides the access to the data and reducer for the <App /> 
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
