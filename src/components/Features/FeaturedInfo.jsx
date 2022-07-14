import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React , {useState, useEffect} from 'react'
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../utils/UserContext";



const FeaturedInfo = () => {

    const navigate = useNavigate();
    const {username} = useUserContext();

    const INVESTMENT_ALL = "http://34.160.0.103/investments/alldata";
    const [alldata, setalldata] = useState([])

    useEffect(() => {
      if (!username){
        navigate("/");
      }
      else{
       axios.get(INVESTMENT_ALL, {
        params: {
          username: username,
        },
      }).then(res => {
        setalldata(res.data);
      })
      
      }

    }, [])

    const arrow1 = () => {

      if ( alldata.actual >= alldata.base)
      {
          return  <ArrowUpward className="featuredIcon"/>;
      }

      else return  <ArrowDownward className="featuredIconnegative"/>
    }


  return (

    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Patrimoine de base</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{alldata.base} €</span>      
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Patrimoine actuel</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{alldata.actual} €</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Bénéfice total</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{alldata.benefice} €</span>
          <span className="featuredMoneyRate">
            {alldata.poucentageallbenefice}%
            { arrow1 () }
          </span>
          
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo