
import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import InvestmentService from '../services/InvestmentService'
import "./ListInvestmentComponent.css"
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from 'axios';


const ListInvestmentComponent = () => {

    const [investments, setinvestments] = useState([])

    useEffect(() => {
      
        InvestmentService.getAllInvestments().then((Response) =>{
            setinvestments(Response.data);
            
        })
    }, [])
    
    const arrow1 = (e) => {

        if ( e.actual >= e.capital)
        {
            return  <span className='up'>
                    <ArrowUpward className="featuredIcon"/> 
                    <span>{Number(((e.actual - e.capital) / e.capital) * 100).toFixed(2)} %</span>
                    </span>
        }   

        else
            return   <span className='down'>
                    <ArrowDownward className="featuredIcon"/> 
                    <span>-</span>
                    </span> 

        }



  return (
    <div className='listcontainer'>
        <h2 className ="title"> Liste des investissements</h2>
        <table className='table table-bordered table-striped'>
            <thead>
                <th className="items"> Id</th>
                <th className="items"> Name</th>
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
                            <td className="cellule"> {investment.capital} €</td>
                            <td className="cellule"> {investment.actual} €</td>
                            <td className="cellule"> {investment.benefice} €
                                {arrow1(investment)}
                            </td>
                            <td className="celluleboutons">
                                <Link className='btn btn-info' to={'/update/'+ investment.id}> Modifier</Link>
                                <button className='btn btn-primary' style = {{marginLeft : "10px"}} onClick={(e) => axios.get("http://34.160.0.103/statistics/getstatisticsof/",investment.name,"venenium")}> Statistiques</button>
                                <button className='btn btn-danger' style = {{marginLeft : "10px"}} onClick={(e) => axios.delete("http://34.160.0.103/investments/delete/"+investment.id)}> X</button>
                                

                            </td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
        <Link to= "/addinvestment" style={{width : "100%"}} className="btn btn-primary mb-2" > Ajouter</Link>
        
    
    
    </div>
  )
}

export default ListInvestmentComponent