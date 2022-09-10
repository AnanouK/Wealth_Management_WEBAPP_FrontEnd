import { useState } from "react"
import React from 'react'
import InvestmentService from "../../services/InvestmentService"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AddInvestmentComponent.css"
import { useEffect } from "react";
import axios from "axios";

export const AddInvestmentComponent = () => {

    const username = localStorage.getItem('username');
    const [name, setname] = useState("")
    const [startdate, setstartdate] = useState("")
    const [capital, setcapital] = useState(0)
    const [actual, setactual] = useState(0)

    const navigate = useNavigate();
    const {id} = useParams();


    const format = (inputDate) => {
        let date, month, year;
      
        date = inputDate.getDate();
        month = inputDate.getMonth() + 1;
        year = inputDate.getFullYear();
      
          date = date
              .toString()
              .padStart(2, '0');
      
          month = month
              .toString()
              .padStart(2, '0');
      
        return `${date}-${month}-${year}`;
      }

    const saveInvestment = (e) => {
        e.preventDefault();

        if(!id){
            let start = format(new Date(startdate));
            const investment = {name,start,capital,actual,username}
            InvestmentService.saveInvestment(investment,username);  
            setTimeout(() => navigate("/investments"), 1000);    
        }

        else {
            let start = format(new Date(startdate));
            const newinvestment = {name,start,capital,actual,username};
            InvestmentService.updateInvestment(newinvestment,id,username);
            setTimeout(() => navigate("/investments"), 1000); 
        }


    }

    useEffect(() => {
        if(id)
        {
            getsingleinvest(id);
        }
        window.scrollTo(0, 0);
    }, [id])

    const getsingleinvest = (id) => {

        axios.get("http://34.160.0.103/investments/", {
            params: {
              id: id,
            },
          }).then(res => {
            setname(res.data.name);
            setstartdate(res.data.start);
            setcapital(res.data.capital);
            setactual(res.data.actual);
        });

    }

    const submitchange = () => {
        if(id)
        {
            return "Modifier";
        }

        else return "Ajouter";
    }

    const titlechange = () => {
        if(id)
        {
            return "Modifier un investissement";
        }

        else return "Ajouter un investissement";
    }

    const datechange = () => {
        if(id)
        {
            return "Date de la modification (Date du jour)";
        }

        else return "Date de départ";
    }


  return (

    <div className="addorupdate">
        <div>
        <br />
        <div className="containeraddinvest">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <br />
                    <h2 className="text-center"> {titlechange()} </h2>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label className="form-label"> Nom : </label>
                                <input type="text" placeholder="Bourse" name="name" className="form-control" value={name} onChange = {(e) => setname(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> {datechange()} : </label>
                                <input type="date" placeholder="07/08/2021" name="start" className="form-control" value={startdate} onChange = {(e) => setstartdate(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Capital déposé : </label>
                                <input type="number" placeholder="1000" name="capital" className="form-control" value={capital} onChange = {(e) => setcapital(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Capital Actuel : </label>
                                <input type="number" placeholder="1500" name="actual" className="form-control" value={actual} onChange = {(e) => setactual(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Remplissage </label>
                                <select className="form-select" aria-label="Default select example" defaultValue={"Manuel"}>
                                    <option value="Manuel">Manuel</option>
                                    <option value="Automatique">Automatique(En construction)</option>
                                </select>
                            </div>
                            <br />
                            <Button variant="contained" endIcon={<SendIcon />} style={{marginRight : "10px"}} onClick={(e) => saveInvestment(e) }> {submitchange()} </Button> 
                            <Button  variant="contained" color="error" startIcon={<DeleteIcon />}> <Link to={"/dashboard"} className="linkbutton">Annuler</Link> </Button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    </div>
    <div className="fill"></div>
    </div>
  )
}
