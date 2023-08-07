import GoalDisplay from "./GoalDisplay";
import GoalForm from "./GoalForm";
import GoalParent from "./GoalParent";
import { useGoalData } from "./GoalsContext";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import './Goal.scss';


export default function GoalsPage(props){
    const globalGoalsData = useGoalData();

    return(
        <div>
            <h1 className="title" >Budget Manager</h1>
            {globalGoalsData.map((goal) => {
                return(
                    <div key={goal.id}>
                            {/* <GoalDisplay id={goal.id} /> */}
                            <GoalParent id={goal.id} />
                    </div>
                )
            })}
            <br />
            <button className="addGoal" ><Link to="/addGoal">Add Goal</Link></button>
            <Navbar />
            
        </div>
    )
}