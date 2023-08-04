import { useState, useEffect } from "react";
import { useGoalData, useGoalDispatch } from "./GoalsContext";
import './Goal.scss';
import { Link } from "react-router-dom";

export default function GoalForm(props) {

    const{id} = props;

    const globalGoalsData = useGoalData();
    const globalGoalsDispatch = useGoalDispatch();

    const [localTitle, setLocalTitle] = useState("");
    const [localTargetAmount, setLocalTargetAmount] = useState("");
    const [localInitialAmount, setLocalInitialAmount] = useState("");
    

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

    const saveGoalToGlobal = () => {
        let tempNewGoal = {
            id: id || globalGoalsData.length + 1,
            title: localTitle,
            targetAmount: Number(localTargetAmount),
            initialAmount: localInitialAmount
        }

        if(id) {
            globalGoalsDispatch({type:"updateGoal", updateGoal: tempNewGoal})
        } else {
            globalGoalsDispatch({type:"create", newGoal: tempNewGoal})
        }
    }

    // const deleteGoal = () => {
    //     let tempOldGoal = {
    //         id: id,
    //         title: localTitle,
    //         targetAmount: localTargetAmount,
    //         initialAmount: localInitialAmount
    //     }

    //     if(id) {
    //         globalGoalsDispatch({type:"deletGoal", deleteGoal: tempOldGoal})
    //     } else {
    //         return(
    //             <p>Nothing to delete</p>
    //          )
    //     }
    // }


    return(
        <div className="goalsContainer">
            <h3 className="newGoal">Goal</h3>
            <form>
                <div className="item">
                    <label>Name </label>
                    <input type="text" name="title" value={localTitle} onChange={(event) => setLocalTitle(event.target.value)} />
                </div>

                <div className="item">
                <label>Target Amount</label>
                <input type="text" name="targetAmount" value={localTargetAmount} onChange={(event) => setLocalTargetAmount(event.target.value)} />
                </div>

                <div className="item">
                    <label>Initial Amount</label>
                    <input type="text" name="initialAmount" value={localInitialAmount} onChange={(event) => setLocalInitialAmount(event.target.value)} />
                </div>
            </form>

            <button className="button" onClick={saveGoalToGlobal}><Link to="/goals">Save</Link></button>
            {/* <button className="button" onClick={deleteGoal}><Link to="/goals">Delete</Link></button> */}
        </div>
    );
}