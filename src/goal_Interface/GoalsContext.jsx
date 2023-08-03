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

            return stateEditable[indexToRemove] = action.deleteGoal
            // return stateEditable.filter(user => user.id !== action.id)
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

    useEffect(() => {
        goalsDispatch({type:"setup", addData: persistentData});
    },[]);

    useEffect(() => {
        console.log("Local Storage: " + persistentData);
    },[persistentData]);

    useEffect(() => {
        setPersistentData(goalsData);
    },[goalsData]);

    return(
        <GoalDataContext.Provider value={goalsData}>
            <GoalDispatchContext.Provider value={goalsDispatch}>
                {props.children}
            </GoalDispatchContext.Provider>
        </GoalDataContext.Provider>
    )
};



