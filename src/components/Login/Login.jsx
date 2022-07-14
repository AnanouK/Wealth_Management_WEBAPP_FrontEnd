import React from "react"
import { useState, useContext } from "react"
import "./Login.css";
import { Link, Navigate, useNavigate} from 'react-router-dom'
import { userContext, useUserContext } from "../../utils/UserContext";

export const Login = () => {

  const [nom, setnom] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate();
  const { logIn } = useUserContext();
  const { username } = useUserContext();

  const submittest = (e) => {
    e.preventDefault();
    logIn(nom); 
    navigate("/dashboard");

  }

  return (
      <form className="Auth-form" onSubmit={(e) => submittest(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Connexion</h3>
          <div className="form-group mt-3">
            <label>Nom d'utilisateur</label>
            <input
              type
              required
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
              value={password} onChange = {(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
          <button className='btn btn-primary' type="submit" > Valider</button>
              
          </div>
        </div>
      </form>
  )
}

export default Login;