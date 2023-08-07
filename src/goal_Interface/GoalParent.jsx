import { useState } from "react";
import GoalForm from "./GoalForm";
import GoalDisplay from "./GoalDisplay";
import './Goal.scss';

// Goals can be edited, we can change tehir name, goal amount and current amount 
export default function GoalParent(props) {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
// It will change its page if the suer decides to edit a goal 
    return(
        <div>
            {editMode ?  <GoalForm id={props.id} /> : <GoalDisplay id={props.id} />}
            <button className="editButton" onClick={toggleEditMode}>Edit Goal</button>
        </div>
    )
}