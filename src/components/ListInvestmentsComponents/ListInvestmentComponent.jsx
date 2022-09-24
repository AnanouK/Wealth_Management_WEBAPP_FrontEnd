import React , {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import "./ListInvestmentComponent.css"
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDropDown, ArrowDropUp} from "@mui/icons-material";



const ListInvestmentComponent = () => {

    const username = localStorage.getItem('username');
    const [investments, setinvestments] = useState([])
    const [windowSize, setWindowSize] = useState(getWindowSize());

  
    function getWindowSize() {
      const {innerWidth, innerHeight} = window;
      return {innerWidth, innerHeight};
    }

    useEffect(() => {
        if (!username){
            navigate("/");
          }
          else{

          
        getAllInvestments();
        window.scrollTo(0, 0);
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }
    }, [])
    
    const INGRESS_API = "34.160.0.103";
    const INVESTMENT_BASE_API_URL = "http://" + INGRESS_API + "/investments/allinvestments";
    const INVESTMENT_GETACTUAL = "http://" + INGRESS_API + "/investments/allactual";

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
                    <ArrowDropUp className="featuredIcon" fontSize={windowSize.innerWidth<= 1000 ? ("10px") : ("small")}/> 
                    <span>{Number(((e.actual - e.capital) / e.capital) * 100).toFixed(2)}%</span>
                    </span>
        }   

        else if (e.actual < e.capital)
        {
            return   <span className='down'>
                    <ArrowDropDown className="featuredIconnegative" fontSize={windowSize.innerWidth<= 1000 ? ("10px") : ("small")}/>
                    <span>{Number(((e.actual - e.capital) / e.capital) * 100).toFixed(2)}%</span>
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
                  username: username
                },
              });
              axios.get(INVESTMENT_GETACTUAL, {
                params: {
                  username: username,
                },
              }).then(response => {
                var actual = response.data;
                var today = new Date();
                var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                var global = {name:"global",start:date,capital:0,actual:actual,username:username};
                setTimeout(getAllInvestments(),1000);
              });
            
              toast.success("Supprimé avec succès", {
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

    const deleteAll= () => {
      axios.delete("http://34.160.0.103/statistics/delete/all", {
        params: {
          username: username
        },
      });
      axios.delete("http://34.160.0.103/investments/delete/all", {
        params: {
          username: username
        },
      });
      axios.get(INVESTMENT_GETACTUAL, {
        params: {
          username: username,
        },
      }).then(response => {
        var actual = response.data;
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var global = {name:"global",start:date,capital:0,actual:actual,username:username};
      });
      setTimeout(getAllInvestments(),2000);
    }

  return (
    <div className='listcontainer'>
        <h2 className ="title"> Liste des Actifs/Passifs</h2>
        <table className='tableinvestments'>
            <thead>
              <tr>
                <th className="items"> Nom </th>
                <th className="items"  hidden={windowSize.innerWidth<= 1000 ? (true) : (false)}> Date dernière modification</th>
                <th className="items"  hidden={windowSize.innerWidth<= 1000 ? (true) : (false)}> Capital Déposé</th>
                <th className="items"> Capital Actuel</th>
                <th className="items"> Bénéfice</th>
                <th className="items"> Actions</th>
              </tr>
            </thead>
            <tbody className="body">
                {
                    investments.map(
                        investment =>
                        <tr className="test1" key={investment.id}>
                            <td className="cellule"> {investment.name}</td>
                            <td className="cellule"  hidden={windowSize.innerWidth<= 1000 ? (true) : (false)}> {investment.start}</td>
                            <td className="cellule"  hidden={windowSize.innerWidth<= 1000 ? (true) : (false)}> {investment.capital.toLocaleString()} €</td>
                            <td className="cellule"> {investment.actual.toLocaleString()} €</td>
                            <td className="cellulebenefice"> {investment.benefice.toLocaleString()} €
                                <span>{arrow1(investment)}</span>
                            </td>
                            <td className="celluleboutons" >
                                <Link to={'/update/'+ investment.id}><Fab color="info" size='small' aria-label="edit" style={{fontSize: 10}}><EditIcon /></Fab></Link>
                                <Link to={"/statistics/"+investment.name}><AnalyticsIcon  style={{ fontSize: 40 }} color='primary'/></Link>
                                <button className='btn btn-danger' style = {{marginLeft : "5px", height: "40px", width:"35px"}} onClick={() => deleteinvest(investment.id, investment.name)}>X</button>
                                

                            </td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
        <Link to= {"/addinvestment"} style={{width : "100%"}} className="btn btn-primary mb-2" > Ajouter</Link>
        <button style={{width : "100%"}} className="btn btn-danger" onClick={() => deleteAll()} > Tout Effacer</button>
    <div className='fill'></div>
    </div>

    
  )
}

export default ListInvestmentComponent

