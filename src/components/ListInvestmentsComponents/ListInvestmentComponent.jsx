import React , {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./ListInvestmentComponent.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useUserContext } from '../../utils/UserContext';



const ListInvestmentComponent = () => {

    const {username} = useUserContext();

    const [investments, setinvestments] = useState([])

    useEffect(() => {
        if (!username){
            navigate("/");
          }
          else{

          
        getAllInvestments();
        window.scrollTo(0, 0);
    }
    }, [])
    
    const INGRESS_API = "34.160.0.103";
    const INVESTMENT_BASE_API_URL = "http://" + INGRESS_API + "/investments/allinvestments";

    const getAllInvestments = () => {
        return axios.get(INVESTMENT_BASE_API_URL, {
            params: {
              username: username,
            },
          }).then(res => {
            setinvestments(res.data);
        })

    }

    const arrow1 = (e) => {

        if ( e.actual > e.capital)
        {
            return  <span className='up'>
                    <ArrowUpward className="featuredIcon"/> 
                    <span>{Number(((e.actual - e.capital) / e.capital) * 100).toFixed(2)} %</span>
                    </span>
        }   

        else if (e.actual < e.capital)
        {
            return   <span className='down'>
                    <ArrowDownward className="featuredIconnegative"/> 
                    <span>{Number(((e.actual - e.capital) / e.capital) * 100).toFixed(2)} %</span>
                    </span> 
        }

        }

    const navigate = useNavigate();

    const deleteinvest = (id,name) => {

        if(window.confirm("Etes-vous sur de vouloir supprimer cet investissement ?")){
            axios.delete("http://34.160.0.103/investments/delete", {
                params: {
                  id: id,
                },
              });
            axios.delete("http://34.160.0.103/statistics/delete", {
                params: {
                  name: name,
                },
              });

            setTimeout(() => getAllInvestments(), 500); 

        }
    }


  return (
    <div className='listcontainer'>
        <h2 className ="title"> Liste des Actifs/Passifs</h2>
        <table className='table table-bordered table-striped'>
            <thead>
                <th className="items"> Id</th>
                <th className="items"> Nom</th>
                <th className="items"> Date de départ</th>
                <th className="items"> Capital de départ</th>
                <th className="items"> Capital Actuel</th>
                <th className="items"> Bénéfice</th>
                <th className="items1"> Actions</th>
            </thead>
            <tbody className="test2">
                {
                    investments.map(
                        investment =>
                        <tr className="test1" key={investment.id}>
                            <td className="cellule"> {investment.id}</td>
                            <td className="cellule"> {investment.name}</td>
                            <td className="cellule"> {investment.start}</td>
                            <td className="cellule"> {investment.capital.toLocaleString()} €</td>
                            <td className="cellule"> {investment.actual.toLocaleString()} €</td>
                            <td className="cellule"> {investment.benefice.toLocaleString()} €
                                {arrow1(investment)}
                            </td>
                            <td className="celluleboutons">
                                <Link className='btn btn-info' to={'/update/'+ investment.id}> <Fab color="info" size='small' aria-label="edit"><EditIcon /></Fab></Link>
                                <Link to={"/statistics/"+investment.name}><AnalyticsIcon  style={{ fontSize: 40 }} color='primary'/></Link>
                                <button className='btn btn-danger' style = {{marginLeft : "10px"}} onClick={() => deleteinvest(investment.id, investment.name)}> X</button>
                                

                            </td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
        <Link to= {"/addinvestment"} style={{width : "100%"}} className="btn btn-primary mb-2" > Ajouter</Link>
        
    
    
    </div>
  )
}

export default ListInvestmentComponent

