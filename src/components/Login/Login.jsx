import React from "react"
import { useState } from "react"
import "./Login.css";
import { Link} from 'react-router-dom'

export const Login = () => {

  const [nom, setnom] = useState("")

  return (
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Connexion</h3>
          <div className="form-group mt-3">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="votre nom d'utilisateur"
              value={nom} onChange = {(e) => setnom(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
          <Link className='btn btn-primary' to={'/'+ nom}> Valider</Link>
              
          </div>
        </div>
      </form>
  )
}

export default Login;