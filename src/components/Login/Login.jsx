import React from "react"
import { useState, useContext } from "react"
import "./Login.css";
import { Link, Navigate, useNavigate} from 'react-router-dom'
import { userContext, useUserContext } from "../../utils/UserContext";
import axios from "axios";

export const Login = () => {

  const [nom, setnom] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate();
  const { logIn } = useUserContext();
  const { username } = useUserContext();
  const INGRESS_API = "34.160.0.103";
  const LOGIN_BASE_API_URL = "http://" + INGRESS_API + "/users/";

  const submittest = (e) => {
    var result = "";
    e.preventDefault();
    axios.get(LOGIN_BASE_API_URL, {
      params: {
        username: nom,
        password: password
      },
    }).then(res => {
      result = res.data;
    })

    if (result === "success") {
      logIn(nom); 
      navigate("/dashboard");    
    }
    else 
    {
      console.log("test");
      setnom("");
      setpassword("");
    }



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
          <div className="createaccount">
            <Link to="/register"><p> Vous n'avez pas encore de compte ? Cliquez ici</p></Link>
          </div>
        </div>
      </form>
  )
}

export default Login;