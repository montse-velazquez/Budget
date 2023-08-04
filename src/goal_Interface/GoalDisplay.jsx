import { useEffect, useState } from "react";
import { useGoalData, useGoalDispatch } from "./GoalsContext";

export default function GoalDisplay(props) {
    const {id} = props;
    const [localGoal, setLocalGoal] = useState({});

    const globalGoalsData = useGoalData();
    const globalGoalsDispatch = useGoalDispatch();

    useEffect(() => {
        setLocalGoal(globalGoalsData.find(globalSpecificGoal => {
            return globalSpecificGoal.id === id;
        }));
    },[globalGoalsData, id])

    const deleteGoalFromGoals = () => {
        let targetGoal = {
            id: id
        }
        if(id) {
            globalGoalsDispatch({type:"deleteGoal", deleteGoal: targetGoal})
        } else {
            return (
                <p>Nothing to delete</p>
            )
        }
    }

    return(
        <div>
            <button onClick={deleteGoalFromGoals}>X</button>
            <h4>{localGoal.title}</h4>
            <p>Target Amount: </p>
            <p>{localGoal.targetAmount}</p>
            <p>Amount: </p>
            <p>{localGoal.initialAmount}</p>
        </div>
    )
}