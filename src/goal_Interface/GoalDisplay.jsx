import { useEffect, useState } from "react";
import { useGoalData, useGoalDispatch } from "./GoalsContext";
import './Goal.scss';

// Renders the stored Goals and allows the users to add an amount to each goal when they want to increase their saving oin each goal 
export default function GoalDisplay(props) {
    const {id} = props;
    const [localGoal, setLocalGoal] = useState({});
// Provides access to Goals Data and Reducer 
    const globalGoalsData = useGoalData();
    const globalGoalsDispatch = useGoalDispatch();

    // Keeps track of each rendered Goal
    useEffect(() => {
        setLocalGoal(globalGoalsData.find(globalSpecificGoal => {
            return globalSpecificGoal.id === id;
        }));
    },[globalGoalsData, id])

    // Function for deleting a goal, no validation or verification is needed for deleting a goal 
    const deleteGoalFromGoals = () => {
        let targetGoal = {
            id: id
        }
        // Sends action to reducer and the target id for deleting 
        if(id) {
            globalGoalsDispatch({type:"deleteGoal", deleteGoal: targetGoal})
        } else {
            return (
                <p>Nothing to delete</p>
            )
        }
    }

    // Stores the local amount of the current goal so the introduced amount can be added to the proper Goal, and make the correct math 
    const [localInitialAmount, setLocalInitialAmount] = useState(0);
    // Finds the Goal through the id that identifies each Goal 
    const addAmountToGoal = () => {
        let targetGoal = { 
            id: id,
            initialAmount: localGoal.initialAmount += parseInt(localInitialAmount) //10
        }
        // Sends action to Reducer
        if(id) {
            globalGoalsDispatch({type:"addAmountToGoal", addAmount: targetGoal})
        } else {
            return (
                <p>Nothing to add</p>
            )
        }
    }

    // Renders all the elements needed for viewing all stored Goals, and offers the options for adding an amount
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
                {/* <button onClick={addAmountToGoal}>Add Amount</button>  ==> Used to be functional till some upgrades were done  */}
            </div>
        </div>
    )
}