import { useEffect, useState } from "react";
import { useGoalData } from "./GoalsContext";

export default function GoalDisplay(props) {
    const {id} = props;
    const [localGoal, setLocalGoal] = useState({});

    const globalGoalsData = useGoalData();

    useEffect(() => {
        setLocalGoal(globalGoalsData.find(globalSpecificGoal => {
            return globalSpecificGoal.id === id;
        }));
    },[globalGoalsData, id])

    return(
        <div>

            <h4>{localGoal.title}</h4>
            <p>Target Amount: </p>
            <p>{localGoal.targetAmount}</p>
            <p>Initial Amount: </p>
            <p>{localGoal.initialAmount}</p>
        </div>
    )
}