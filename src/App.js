import './App.css';
import ListInvestmentComponent from './components/ListInvestmentComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import Sidebar from './components/Sidebar/sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedInfo from './components/Features/FeaturedInfo';
import { AddInvestmentComponent } from './components/AddInvestmentComponent/AddInvestmentComponent';
import Charts from './components/Charts/Charts';

function App() {
  return (

    <Router>
      <HeaderComponent/>
      <div className="test">
        <Sidebar/>
        <div className="container">
          <Routes>
              <Route path='/' element = { <><FeaturedInfo/><ListInvestmentComponent/></>} ></Route>
              <Route path='/investments'  element = { <ListInvestmentComponent/>}  ></Route>
              <Route path='/addinvestment'  element = { <AddInvestmentComponent/>}  ></Route>
              <Route path='/update/:id'  element = { <AddInvestmentComponent/>}  ></Route>
              <Route path='/statistics/:name'  element = { <Charts/>}  ></Route>
          </Routes>
         </div>
      </div>

    </Router>
      
    
  );
}

export default App;
