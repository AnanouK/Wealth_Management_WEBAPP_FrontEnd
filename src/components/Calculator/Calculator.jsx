import React from "react"
import { useState} from "react"
import "./Calculator.css";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const INGRESS_API = "34.160.0.103";
const CALCULATOR_GETDATA = "http://" + INGRESS_API + "/calculator/";

export const Calculator = () => {

  const [time, settime] = useState(1)
  const [initial, setinitial] = useState(0)
  const [pourcentage, setpourcentage] = useState(0)
  const [monthly, setmonthly] = useState(0)
  const [data, setdata] = useState([])
  const [monthlyWant, setmonthlyWant] = useState(0)
  const [hide, sethide] = useState(true)
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [pourcentageSelect, setPourcentageSelect]= useState("")

  
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }


  const Calculate = (e) => {
    e.preventDefault();
    sethide(false);
    if(pourcentage !== 0 && time !== 0)
    {
      axios.get(CALCULATOR_GETDATA, {
        params: {
          time: time,
          initial: initial,
          pourcentage: pourcentage,
          monthly: monthly,
          goal: monthlyWant,
          pourcentageSelect: pourcentageSelect,
        },
      }).then(res => {
        setdata(res.data); 
      })
    }

        function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }
  

  var without2Last = [...data];
  without2Last.splice(-1);
  without2Last.splice(-1);
  
  return (
    <div className="Calculator">
      <form className="Auth-form-calculator" onSubmit={(e) => Calculate(e)}>
        <div className="Auth-form-content-calculator">
          <h3 className="Auth-form-title-calculator">Calcule des intérêts composés</h3>
          <div className="form-group mt-3">
            <label>Durée de simulation (En année) : {time}</label>
            <Slider
              size="small"
              valueLabelDisplay="auto"
              value={time}
              onChange = {(e) => settime(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label>Montant Initial</label>
            <input
              type="number"
              required
              className="form-control mt-1"
              placeholder="votre capital de départ"
              value={initial} onChange = {(e) => setinitial(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label>Rendement (%)</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Pourcentage de rendement"
              value={pourcentage} onChange = {(e) => setpourcentage(e.target.value)}
            />
          </div>
          <br/>
          <FormControl fullWidth variant="standard" size="small">
            <InputLabel id="demo-simple-select-label">Annuel ou Mensuel ?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"Annuel"}
              label="Age"
              value={pourcentageSelect}
              onChange={(e) => setPourcentageSelect(e.target.value)}
            >
              <MenuItem value={"Annuel"}>Annuel</MenuItem>
              <MenuItem value={"Mensuel"}>Mensuel</MenuItem>
            </Select>
          </FormControl>
          <div className="form-group mt-3">
            <label>Ajout mensuel</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Montant de la somme investie chaque mois"
              value={monthly} onChange = {(e) => setmonthly(e.target.value)}
            />
            </div>
            <div className="form-group mt-3">
            <label className="lastLine">Objectif de gain mensuel ? (Aucun = 0)</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Gain mensuel souhaité"
              value={monthlyWant} onChange = {(e) => setmonthlyWant(e.target.value)}
            />
            </div>
            <br></br>
          <div className="d-grid gap-2 mt-3">
          <Button variant="contained" type="submit" > Calculer</Button>
              
          </div>
        </div>
      </form>
      {
         (monthlyWant !== 0 && data.length !== 0 && data[data.length - 2].Years) ? (
          <div className="goal" hidden={false}> Vous atteindrez votre objectif mensuel dans : {data[data.length - 2].Years} Année(s) et {parseInt(data[data.length - 1].Months) + 1} Mois</div>) : (null)
        
      }
            {
         (monthlyWant !== 0 && data.length !== 0 && data[data.length - 2].Years == null ) ? (
          <div className="goal" hidden={false}> Votre objectif mensuel n'est pas atteint dans cette simulation</div>) : (null)
        
      }

      { (!hide)? 
      (
      <div className="calculatorchart">
        <h2 className='title'> Evolution du capital: </h2>
        <ResponsiveContainer width="100%" aspect={windowSize.innerWidth<= 1000 ? (1) : (3)}>
        <AreaChart
          data={data}
          margin={{
            top: 15,
            right: 12,
            bottom: 5,
            left: 50,
          }}
        >
          <CartesianGrid  horizontal="true" vertical="" stroke="#243240" strokeDasharray="3 3"/>
          <XAxis dataKey="Mois" tick={{fill:"#fff"}} name="Date" allowDuplicatedCategory="false" hide={windowSize.innerWidth<= 1000 ? (true) : (false)} />
          <YAxis tick={{fill:"#fff"}} unit={"€"} name="Capital" padding={{bottom: 10}} domain={['dataMin', 'dataMax']} />
          <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
          <Area type="monotone" dataKey="Total" fill='#8884d8' stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
          
        </AreaChart>
      </ResponsiveContainer>
      </div>
      ) : (null)
      }
      
      <div className='listecalculator' >
      <table className='tablecalculator'>
          <thead>
          <tr className="test3" hidden={hide}>
              <th className="items"> Mois</th>
              <th className="items"> Capital</th>
              <th className="items"> Total Investi</th>
              <th className="items"> Total Gagné</th>
              <th className="items"> Gain sur le mois</th>

          </tr>

          </thead>
          <tbody className="test2">
              {
                  without2Last.map(
                      list => 
                      <tr className="test1" key={list.Mois}>
                          <td className="cellule"> {list.Mois}</td>
                          <td className="cellule"> {parseFloat(list.Total).toLocaleString()} €</td>
                          <td className="cellule"> {parseFloat(list.allInvest).toLocaleString()} €</td>
                          <td className="cellule"> {parseFloat(list.allWon).toLocaleString()} €</td>
                          <td className={(monthlyWant !== 0 && monthlyWant<=parseFloat(list.monthEarn)) ? ("celluleabove") : ("celluleearn")}> {parseFloat(list.monthEarn).toLocaleString()} €</td>
                          
                      </tr>
                  )
              }
              
          </tbody>
      </table>
    </div>
  </div>
  
  )
}



export default Calculator;