import './App.css';
import ListInvestmentComponent from './components/ListInvestmentsComponents/ListInvestmentComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import Sidebar from './components/Sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedInfo from './components/Features/FeaturedInfo';
import { AddInvestmentComponent } from './components/AddInvestmentComponent/AddInvestmentComponent';
import Charts from './components/Charts/Charts';
import Login from "./components/Login/Login"


function App() {
  return (
  <div className='App'>
    <Router>
        <HeaderComponent/>
        <Sidebar/>
        <div className="container">
          <Routes>
              <Route path='/:username' element = { <><FeaturedInfo/><ListInvestmentComponent/></>} ></Route>
              <Route path='/' element ={<Login/>}></Route>
              <Route path='/investments/:username'  element = { <ListInvestmentComponent/>}></Route>
              <Route path='/addinvestment/:username'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/update/:id:username'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/statistics/:username'  element = { <Charts/>}></Route>
          </Routes>
         </div>
    </Router>
    </div>
      
    
  );
}

export default App;
