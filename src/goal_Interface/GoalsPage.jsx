import GoalDisplay from "./GoalDisplay";
import GoalForm from "./GoalForm";
import GoalParent from "./GoalParent";
import { useGoalData } from "./GoalsContext";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";


export default function GoalsPage(props){
    const globalGoalsData = useGoalData();

    return(
        <div>
            <h1>Budget Manager</h1>

            <h3>We have {globalGoalsData.length} notes in storage</h3>

            <h3>Goals List:</h3>
            {globalGoalsData.map((goal) => {
                return(
                    <div key={goal.id}>
                            {/* <GoalDisplay id={goal.id} /> */}
                            <GoalParent id={goal.id} />
                    </div>
                )
            })}
            <br />
            <button><Link to="/addGoal">Add Goal</Link></button>
            <Navbar />
            
        </div>
    )
}