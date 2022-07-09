import { useState } from "react"
import React from 'react'
import InvestmentService from "../../services/InvestmentService"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import "./AddInvestmentComponent.css"
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

export const AddInvestmentComponent = () => {

    const [name, setname] = useState("")
    const [start, setstart] = useState("")
    const [capital, setcapital] = useState(0)
    const [actual, setactual] = useState(0)

    const navigate = useNavigate();
    const {id} = useParams();

    const saveInvestment = (e) => {
        e.preventDefault();
        
        if(!id){

            const investment = {name,start,capital,actual}
            InvestmentService.saveInvestment(investment);  
            setTimeout(() => navigate("/"), 500);    
        }

        else {

            const newinvestment = {name,start,capital,actual};
            InvestmentService.updateInvestment(newinvestment,id);
            setTimeout(() => navigate("/"), 500); 
        }


    }

    useEffect(() => {
        if(id)
        {
            getsingleinvest(id);
        }
    }, [id])

    const getsingleinvest = (id) => {

        axios.get("http://34.160.0.103/investments/"+id).then(res => {
            setname(res.data.name);
            setstart(res.data.start);
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

  return (
    <div>
        <br />
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <br />
                    <h2 className="text-center"> Ajouter un investissement </h2>
                    <div className="card-body">
                        <form action="">
                            <div className="form-group mb-2">
                                <label className="form-label"> Nom : </label>
                                <input type="text" placeholder="Bourse" name="name" className="form-control" value={name} onChange = {(e) => setname(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Date de départ : </label>
                                <input type="date" placeholder="07/08/2021" name="start" className="form-control" value={start} onChange = {(e) => setstart(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Capital de départ : </label>
                                <input type="number" placeholder="1000" name="capital" className="form-control" value={capital} onChange = {(e) => setcapital(e.target.value)} />
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Capital Actuel : </label>
                                <input type="number" placeholder="1500" name="actual" className="form-control" value={actual} onChange = {(e) => setactual(e.target.value)} />
                            </div>
                            <br />
                            <Button variant="contained" endIcon={<SendIcon />} style={{marginRight : "10px"}} onClick={(e) => saveInvestment(e) }> {submitchange()} </Button> 
                            <Button  variant="contained" color="error" startIcon={<DeleteIcon />}> <Link to="/investments" className="linkbutton">Annuler</Link> </Button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
