import React from "react"
import { useState, useEffect} from "react"
import "./Calculator.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';


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


  const Calculate = (e) => {
    e.preventDefault();
    sethide(false);
    if(pourcentage != 0 && time != 0)
    {
      axios.get(CALCULATOR_GETDATA, {
        params: {
          time: time,
          initial: initial,
          pourcentage: pourcentage,
          monthly: monthly,
          goal: monthlyWant,
        },
      }).then(res => {
        setdata(res.data); 
      })
    }
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
            <label>Rendement (% Annuel)</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Pourcentage de rendement"
              value={pourcentage} onChange = {(e) => setpourcentage(e.target.value)}
            />
          </div>
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
            <label className="lastLine">Objectif de gain mensuel ? (Si non, laissez 0)</label>
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
         (monthlyWant != 0 && data.length != 0 && data[data.length - 2].Years != null ) ? (
          <div className="goal" hidden={false}> Vous atteindrez votre objectif mensuel dans : {data[data.length - 2].Years} Année(s) et {parseInt(data[data.length - 1].Months) + 1} Mois</div>) : (null)
        
      }
            {
         (monthlyWant != 0 && data.length != 0 && data[data.length - 2].Years == null ) ? (
          <div className="goal" hidden={false}> Votre objectif mensuel n'est pas atteint dans cette simulation</div>) : (null)
        
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
                          <td className={(monthlyWant != 0 && monthlyWant<=parseFloat(list.monthEarn)) ? ("celluleabove") : ("celluleearn")}> {parseFloat(list.monthEarn).toLocaleString()} €</td>
                          
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