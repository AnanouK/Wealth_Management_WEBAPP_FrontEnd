import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React , {useState, useEffect} from 'react'
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../../utils/UserContext";
import { color } from "@mui/system";



const FeaturedInfo = () => {

    const navigate = useNavigate();
    const {username} = useUserContext();

    const INVESTMENT_ALL = "http://34.160.0.103/investments/alldata";

    const [alldata, setalldata] = useState([0])

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

      if ( alldata.actual >= alldata.base && alldata.actual != undefined)
      {
          return  <ArrowUpward className="featuredIcon"/>;
      }

      else if (alldata.actual == undefined) return

      else return  <ArrowDownward className="featuredIconnegative"/>
    }

    const checkBeforeShow = (donnee) => {
      if (donnee===undefined){
        return 0
      }

      else return  donnee.toLocaleString()
    }

    const colorOfTheBeneficePourcentage = () => {
      if(alldata.poucentageallbenefice > 0)
      {
        return {color: "green"}
      }

      else if (alldata.poucentageallbenefice < 0){
        return {color: "red"}
      }

      else return {color: "white"}
    }


  return (

    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Patrimoine de base</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" defaultValue={0}> {checkBeforeShow(alldata.base)} €</span>      
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Patrimoine actuel</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" defaultValue={0}>{checkBeforeShow(alldata.actual)} €</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Bénéfice total</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" defaultValue={0}>{checkBeforeShow(alldata.benefice)} €</span>
          <span className="featuredMoneyRate" style={colorOfTheBeneficePourcentage()}>
            {alldata.poucentageallbenefice}%
            { arrow1 () }
          </span>
          
        </div>
      </div>
    </div>
  );
}

export default FeaturedInfo