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

    const [localInitialAmount, setLocalInitialAmount] = useState(0);

    const addAmountToGoal = () => {
        let targetGoal = { 
            id: id,
            initialAmount: localGoal.initialAmount += parseInt(localInitialAmount) //10
        }

        if(id) {
            globalGoalsDispatch({type:"addAmountToGoal", addAmount: targetGoal})
        } else {
            return (
                <p>Nothing to add</p>
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
            <form onSubmit={addAmountToGoal}>
                <label>
                    Amount:
                    <input type="text" value={Number(localInitialAmount)} onChange={(event => setLocalInitialAmount(event.target.value))} />
                </label>
                <button type="submit">Add amount</button>
            </form>
            {/* <button onClick={addAmountToGoal}>Add Amount</button> */}
        </div>
    )
}