import React from "react"
import { useState } from "react"
import "./Login.css";
import { Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const [nom, setnom] = useState("demo1")
  const [password, setpassword] = useState("demo1")

  const navigate = useNavigate();
  const INGRESS_API = "35.227.200.91";
  const LOGIN_BASE_API_URL = "http://" + INGRESS_API + "/users/";

  if(localStorage.getItem('username') !== null)
  {
    navigate("/dashboard");
  }

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
      if (result === "success") {
        localStorage.setItem('username',nom); 
        navigate("/dashboard");
        if(nom === "demo1")
        {
          toast.info("Vous êtes sur une session de démonstration", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }); 
        }
           
      }
      else 
      {
        setnom("");
        setpassword("");
        toast.error("Identifiant ou mot de passe incorrect", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }); 
      }
    })
  }

  return (
    <div className="login">
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
            <Link className="createAccountLink" to="/register"><p> Vous n'avez pas encore de compte ? Cliquez ici</p></Link>
          </div>
        </div>
      </form>
      <div className="fill"></div>
      </div>
  )
}

export default Login;