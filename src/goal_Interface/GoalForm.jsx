import { useState, useEffect } from "react";
import { useGoalData, useGoalDispatch } from "./GoalsContext";
import './Goal.scss';
import { Link } from "react-router-dom";

// GoalForm function provides the proper elements for creating a new goal 
export default function GoalForm(props) {

    const{id} = props;
// Provides the access to the data stored and the Reducer for sending the proper action 
    const globalGoalsData = useGoalData();
    const globalGoalsDispatch = useGoalDispatch();

    // Stores data and function 
    const [localTitle, setLocalTitle] = useState("");
    const [localTargetAmount, setLocalTargetAmount] = useState("");
    const [localInitialAmount, setLocalInitialAmount] = useState("");
    
// Keeps track of the current goal by their id 
    useEffect(() => {
        let tempGoal = globalGoalsData.find(globalSpecificGoal => {
            return globalSpecificGoal.id === id;
        });

        if(tempGoal){
            setLocalTitle(tempGoal.title);
            setLocalTargetAmount(tempGoal.targetAmount);
            setLocalInitialAmount(tempGoal.initialAmount);
        }
    
    },[globalGoalsData, id]);
// Each goal has an id, title, initialAmount and targetAmount that will be requested everytime when cerating a new Goal or updating an existing Goal
    const saveGoalToGlobal = () => {
        let tempNewGoal = {
            id: id || globalGoalsData.length + 1,
            title: localTitle,
            targetAmount: Number(localTargetAmount),
            initialAmount: localInitialAmount
        }
// Send the correct action to the Goal Reducer with the new data 
        if(id) {
            globalGoalsDispatch({type:"updateGoal", updateGoal: tempNewGoal})
        } else {
            globalGoalsDispatch({type:"create", newGoal: tempNewGoal})
        }
    }

    // Renders the input elements for the user introducing its title and proper amounts 
    return(
        <div className="containerGoal">
            <div className="goalsContainer">
                <h3 className="newGoal">Goal</h3>
                <form>
                    <div className="item">
                        <label>Name </label>
                        <input className="addAmountInput" type="text" name="title" value={localTitle} onChange={(event) => setLocalTitle(event.target.value)} />
                    </div>

                    <div className="item">
                    <label>Target Amount</label>
                    <input className="addAmountInput" type="text" name="targetAmount" value={localTargetAmount} onChange={(event) => setLocalTargetAmount(event.target.value)} />
                    </div>

                    <div className="item">
                        <label>Initial Amount</label>
                        <input className="addAmountInput" type="text" name="initialAmount" value={localInitialAmount} onChange={(event) => setLocalInitialAmount(event.target.value)} />
                    </div>
                </form>

                <button className="buttonSave" onClick={saveGoalToGlobal}><Link to="/goals">Save</Link></button>
            </div>
        </div>
    );
}