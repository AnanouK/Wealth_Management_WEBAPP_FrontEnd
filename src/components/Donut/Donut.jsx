import axios from "axios";
import { useState, useEffect} from "react"
import { useUserContext } from '../../utils/UserContext';
import React from "react";
import  Chart  from "react-apexcharts";
import "./Donut.css"

export const Donut = () => {

    const {username} = useUserContext();
    const [alldata, setalldata] = useState([]);
    const [investName, setinvestName] = useState("");
    const [investCapital, setinvestCapital] = useState([]);

    var allcapital = 0;

    const INGRESS_API = "34.160.0.103";
    const STATISTICSDATA = "http://" + INGRESS_API + "/investments/allinvestments";


    
    useEffect(() => {
        getdata();
     
       }, []);

    const getdata = () =>{

        return axios.get(STATISTICSDATA, { params: {username: username}}).then(res =>{setalldata(res.data);});
    }

    var name = [];
    var capital = [];
    
    for (let i = 0; i < alldata.length; i++)
    {
        name.push(alldata[i].name);
        capital.push(alldata[i].actual);
    }
    

    return( 
        <React.Fragment>
            <h2 className="titlestats">Répartition du patrimoine total</h2>
        <div className="container-fluid mb-3">
                <Chart 
                type="donut"
                width={500}
                height={500}
                series={capital}   
                      

                 options={{
                       noData:{text:"Pas de données"},                        
                      labels: name,            
                    }}
                >
                </Chart>

                <Chart 
                type="pie"
                width={500}
                height={500}
                series={capital}   
                      

                 options={{
                       noData:{text:"Pas de données"},                        
                      labels: name,            
                    }}
                >
                </Chart>

        </div>
        </React.Fragment>
    )

}

export default Donut;