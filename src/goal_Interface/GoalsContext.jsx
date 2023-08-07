import { useContext, useReducer, useEffect, createContext } from "react";
import { useLocalStorage } from "react-use";

// Hard coded initial data of goals, showing syntax of Goals Schema 
const initialGoalsData = [
    {
        id: 1,
        title: 'Tattoo',
        targetAmount: 300,
        initialAmount: 30
    },
    {
        id: 2,
        title: 'Travel',
        targetAmount: 1000,
        initialAmount: 100
    }
]

// Goal Reduce that will contain and run CRUD actions for goals 
const goalsReducer = (previousState, action) => {
    let stateEditable = [...previousState]

    // switch case for different cases based on the function that is used by the different actions 
    switch(action.type) {
        case 'setup' : {
            // Set's up the data 
            let localStorageData = action.addData;
            stateEditable = localStorageData;
            return stateEditable;
            // return [
            //     ...goals,
            //     action.addData
            // ]
        }

        // Creates the data for a new goal 
        case 'create': {
            let newGoal = action.newGoal;
            stateEditable.push(newGoal);
            return stateEditable;
            // return [
            //     ...goals.push(action.newGoal)
            // ]
        }

        // We can update the title, initial amount and current amount based on the id of the created goal
        case 'updateGoal': {
            let targetGoalIndex = stateEditable.findIndex(globalSpecificGoal => {
                return globalSpecificGoal.id === action.updateGoal.id;
            })

            stateEditable[targetGoalIndex] = action.updateGoal;
            return stateEditable;
            // return goals.map(goal => {
            //     if(goal.id == action.updateGoal.id)
            //         return action.updateGoal
            //     return goal;
            // })
        }

        // We can delete goals, in this case there is no verification for the suer so deleting an expense is open to everyone 
        case 'deleteGoal' : {
            let indexToRemove = stateEditable.findIndex(globalSpecificGoal => {
                return globalSpecificGoal.id === action.deleteGoal.id;
            })

            stateEditable.splice(indexToRemove, 1);
            return stateEditable;
        }

        // We add the amount introduced by the user to the specific goal
        case 'addAmountToGoal': {
            let indexToAdd = stateEditable.findIndex(globalSpecificGoal => {
                return globalSpecificGoal.id === action.addAmount.id;
            })
            stateEditable[indexToAdd].initialAmount = action.addAmount.initialAmount;
            return stateEditable;
        }

        default: {
            return previousState;
        }
    }
}

// Makes the functions globals 
export const GoalDataContext = createContext(null);
export const GoalDispatchContext = createContext(null);

// Exports the data 
export function useGoalData() {
    return useContext(GoalDataContext);
}
// Exports the reducer 
export function useGoalDispatch() {
    return useContext(GoalDispatchContext);
}

// Will provide the proper access to the Data and Reducer for the <App /> 
export default function GoalsProvider(props){
    const [goalsData, goalsDispatch] = useReducer(goalsReducer, initialGoalsData);

    const [persistentData, setPersistentData] = useLocalStorage('goals', initialGoalsData);

    // ---> if we dont have data, runs twice making our data to appear twice. 
    useEffect(() => {
        goalsDispatch({type:"setup", addData: persistentData});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        console.log("Local Storage: " + persistentData);
    },[persistentData]);

    useEffect(() => {
        setPersistentData(goalsData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[goalsData]);

    return(
        <GoalDataContext.Provider value={goalsData}>
            <GoalDispatchContext.Provider value={goalsDispatch}>
                {props.children}
            </GoalDispatchContext.Provider>
        </GoalDataContext.Provider>
    )
};



