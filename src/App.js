// import { Route, Routes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ExpensesPage from './expensesInterface/ExpensesPage';
import GoalsPage from './goal_Interface/GoalsPage.jsx';
import { SignInPage } from './signinInterface/SignInPage';
import ExpenseForm from './expensesInterface/ExpForm';
import GoalForm from './goal_Interface/GoalForm';


function App() {
  return (
    <div className="App">
    <Routes>
            <Route path='/' element={<SignInPage />}/> 
            <Route path="/goals" element={<GoalsPage/>}/>
            <Route path='/addGoal' element={<GoalForm/>}/>
            <Route path='/expenses' element={<ExpensesPage />}/>
            <Route path='/addExpense' element={<ExpenseForm/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
