import { useEffect, useState } from "react";
import { useGoalData, useGoalDispatch } from "./GoalsContext";
import './Goal.scss';

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
        <div className="containerGoal">
            <div className="perGoal">
                <button onClick={deleteGoalFromGoals}>X</button>
                <h4 className="goalTitle">{localGoal.title}</h4>
                <div className="circle2">
                    <div className="circle">
                        <p className="goalAmount">Goal: </p>
                        <p className="goalAmount">${localGoal.targetAmount} / ${localGoal.initialAmount}</p>
                    </div>
                </div>
                <form onSubmit={addAmountToGoal}>
                    <label className="addAmount">
                        Amount:
                        <br />
                        <input className="addAmountInput" type="text" value={Number(localInitialAmount)} onChange={(event => setLocalInitialAmount(event.target.value))} />
                    </label>
                    <br />
                    <button className="addAmountButton" type="submit">Add amount</button>
                </form>
                {/* <button onClick={addAmountToGoal}>Add Amount</button> */}
            </div>
        </div>
    )
}