import React from "react"
import { useState} from "react"
import "./register.css";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")

  const navigate = useNavigate();
  const INGRESS_API = "35.227.200.91";
  const USER_BASE_API_URL = "http://" + INGRESS_API + "/users/";

  const register = (e) => {
    e.preventDefault();
    const user = {username,email,password}
    var result;
    
    axios.post(USER_BASE_API_URL + "add",user).then(res => {
       result = res.data;
       if(result === "Création de l'utilisateur avec success")
       {
         navigate("/");
         toast.success("Création de votre compte effectué !", {
          toastId: 2,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
       }
       else 
       {
         setusername("");
         toast.warning("Ce nom d'utilisateur est dèjà utilisé !", {
          toastId: 1,
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
    <div className="register">
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
              value={username} onChange = {(e) => setusername(e.target.value)}
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
    <div className="fill"></div>
    </div>
  )
}

export default Register;