import { useState } from "react";
import GoalForm from "./GoalForm";
import GoalDisplay from "./GoalDisplay";
import './Goal.scss';

export default function GoalParent(props) {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    return(
        <div>
            {editMode ?  <GoalForm id={props.id} /> : <GoalDisplay id={props.id} />}
            <button className="editButton" onClick={toggleEditMode}>Edit Goal</button>
        </div>
    )
}