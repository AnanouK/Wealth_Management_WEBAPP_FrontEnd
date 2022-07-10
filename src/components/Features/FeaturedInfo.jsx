import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import getdata from './FeaturedInfoService';
import React , {useState, useEffect} from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Icon } from "@mui/material";

const FeaturedInfo = () => {

    const [alldata, setalldata] = useState([])

    useEffect(() => {

      getthedata();

    }, [])

    const getthedata = () => {
      getdata.getall().then((Response) =>{
        setalldata(Response.data);
    })
    }
    const arrow1 = () => {

      if ( alldata.actual >= alldata.base)
      {
          return  <ArrowUpward className="featuredIcon"/>;
      }

      else return  <ArrowDownward className="featuredIcon"/>
    }


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Capital de base</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{alldata.base} €</span>
           
        </div>
        <span className="featuredSub">De tous les investissements</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Capital actuel</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{alldata.actual} €</span>
        </div>
        <span className="featuredSub">De tous les investissements</span>
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
        <span className="featuredSub">Comparé au capital de base</span>
      </div>
    </div>
  );
}

export default FeaturedInfo