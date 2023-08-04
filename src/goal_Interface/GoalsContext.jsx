import { useContext, useReducer, useEffect, createContext } from "react";
import { useLocalStorage } from "react-use";

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

const goalsReducer = (previousState, action) => {
    let stateEditable = [...previousState]

    switch(action.type) {
        case 'setup' : {

            let localStorageData = action.addData;
            stateEditable = localStorageData;
            return stateEditable;
            // return [
            //     ...goals,
            //     action.addData
            // ]
        }

        case 'create': {
            let newGoal = action.newGoal;
            stateEditable.push(newGoal);
            return stateEditable;
            // return [
            //     ...goals.push(action.newGoal)
            // ]
        }

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

        case 'deleteGoal' : {
            let indexToRemove = stateEditable.findIndex(globalSpecificGoal => {
                return globalSpecificGoal.id === action.deleteGoal.id;
            })

            stateEditable.splice(indexToRemove, 1);
            return stateEditable;
        }

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

export const GoalDataContext = createContext(null);
export const GoalDispatchContext = createContext(null);

export function useGoalData() {
    return useContext(GoalDataContext);
}
export function useGoalDispatch() {
    return useContext(GoalDispatchContext);
}

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



