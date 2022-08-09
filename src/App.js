import './App.css';
import ListInvestmentComponent from './components/ListInvestmentsComponents/ListInvestmentComponent';
import HeaderComponent from './components/Header/HeaderComponent';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedInfo from './components/Features/FeaturedInfo';
import { AddInvestmentComponent } from './components/AddInvestmentComponent/AddInvestmentComponent';
import Charts from './components/Charts/Charts';
import Login from "./components/Login/Login"
import { UserContextProvider } from './utils/UserContext';
import { Donut } from './components/Donut/Donut';
import Register from './components/Register/register';
import ChartsGlobal from './components/ChartsGlobal/ChartsGlobal';
import Calculator from "./components/Calculator/Calculator";
import {ToastContainer} from"react-toastify";



function App() {

  return (

<UserContextProvider>
  <div className='App'>
    <Router>
        <HeaderComponent/>
        <div className="container">
          <Routes>
              <Route path='/dashboard' element = { <><FeaturedInfo/><Donut/><ChartsGlobal/></>} ></Route>
              <Route path='/' element ={<Login/>}></Route>
              <Route path='/register' element ={<Register/>}></Route>
              <Route path='/investments'  element = { <ListInvestmentComponent/>}></Route>
              <Route path='/addinvestment'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/update/:id'  element = { <AddInvestmentComponent/>}></Route>
              <Route path='/statistics/:name'  element = { <Charts/>}></Route>
              <Route path='/calculator'  element = { <Calculator/>}></Route>
          </Routes>
         </div>
         <ToastContainer 
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
    </Router>
    </div>
</UserContextProvider>


      
    
  );
}

export default App;
