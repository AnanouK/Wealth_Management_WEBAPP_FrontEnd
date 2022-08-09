import React from "react"
import { useState} from "react"
import "./Calculator.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Calculator = () => {

  const [time, settime] = useState(1)
  const [initial, setinitial] = useState("")
  const [pourcentage, setpourcentage] = useState("")
  const [monthly, setmonthly] = useState("")

  const Calculate = (e) => {
    e.preventDefault();
    console.log(time,initial,pourcentage,monthly);
  }

  toast.info("Cette section est en cours de construction.", {
    toastId: 1,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  return (
      <form className="Auth-form-calculator" onSubmit={(e) => Calculate(e)}>
        <div className="Auth-form-content-calculator">
          <h3 className="Auth-form-title-calculator">Calcule des intérêts composés</h3>
          <div className="form-group mt-3">
            <label>Durée de simulation (En année) : {time}</label>
            <input
              type="range"
              required
              className="form-control mt-1"
              placeholder="La durée souhaitée"
              value={time} onChange = {(e) => settime(e.target.value)}
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
            <label>Rendement</label>
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
              defaultValue={0}
              value={monthly} onChange = {(e) => setmonthly(e.target.value)}
            />
            </div>
            <br></br>
          <div className="d-grid gap-2 mt-3">
          <button className='btn btn-primary' type="submit" > Calculer</button>
              
          </div>
        </div>
      </form>
  )
}

export default Calculator;