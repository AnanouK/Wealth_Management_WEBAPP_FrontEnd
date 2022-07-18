import React from "react"
import { useState, useContext } from "react"
import "./register.css";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export const Login = () => {

  const [nom, setnom] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")

  const navigate = useNavigate();
  const INGRESS_API = "34.160.0.103";
  const USER_BASE_API_URL = "http://" + INGRESS_API + "/users/";

  const register = (e) => {
    e.preventDefault();
    const user = [nom,email,password]
    axios.get(USER_BASE_API_URL + "add",user).then(res => {
      if(res.data === "Création de l'utilisateur avec success")
      {
        navigate("/login");
      }
      else 
      {
        navigate("/register");
      }
    })
    

  }

  return (
      <form className="Auth-form-register" onSubmit={(e) => register(e)}>
        <div className="Auth-form-content-register">
          <h3 className="Auth-form-title-register">Inscription</h3>
          <div className="form-group mt-3">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="votre nom d'utilisateur"
              value={nom} onChange = {(e) => setnom(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="votre adresse mail"
              value={email} onChange = {(e) => setemail(e.target.value)}
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
          <button className='btn btn-success' type="submit" > Valider</button>
              
          </div>
        </div>
      </form>
  )
}

export default Login;