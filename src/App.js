import './App.css';
import ListInvestmentComponent from './components/ListInvestmentsComponents/ListInvestmentComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import Sidebar from './components/Sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedInfo from './components/Features/FeaturedInfo';
import { AddInvestmentComponent } from './components/AddInvestmentComponent/AddInvestmentComponent';
import Charts from './components/Charts/Charts';
import Login from "./components/Login/Login"
import { UserContextProvider } from './utils/UserContext';
import { Donut } from './components/Donut/Donut';
import Register from './components/Register/register';



function App() {

  return (

<UserContextProvider>
  <div className='App'>
    <Router>
      
        <HeaderComponent/>
        <div className="container">
          <Routes>
              <Route path='/dashboard' element = { <><FeaturedInfo/><ListInvestmentComponent/><Donut/></>} ></Route>
              <Route path='/' element ={<Login/>}></Route>
              <Route path='/register' element ={<Register/>}></Route>
              <Route path='/investments'  element = { <ListInvestmentComponent/>}></Route>
              <Route path='/addinvestment'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/update/:id'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/statistics/:name'  element = { <Charts/>}></Route>
          </Routes>
         </div>
    </Router>
    </div>
</UserContextProvider>
      
    
  );
}

export default App;
