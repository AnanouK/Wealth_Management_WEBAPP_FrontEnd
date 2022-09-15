import axios from "axios";
import { useState, useEffect} from "react"
import React from "react";
import  Chart  from "react-apexcharts";
import "./Donut.css"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Donut = () => {

    const username = localStorage.getItem('username');
    const [alldata, setalldata] = useState([]);

    const INGRESS_API = "34.160.0.103";
    const STATISTICSDATA = "http://" + INGRESS_API + "/investments/allinvestments";
    const [windowSize, setWindowSize] = useState(getWindowSize());

  
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }



    
    useEffect(() => {
        getdata();
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
     
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
            <div className="donut">
            <h2 className="titlestats">Répartition du patrimoine total</h2>
        <div className="container-fluid mb-3">
                <Chart 
                type="donut"
                width={550}
                height={450}
                series={capital}   
                options={{
                    noData:{text:"Pas de données"},                        
                    labels: name, 
                    legend: {position: "bottom",labels: {useSeriesColors: "true", }},
                    responsive: [{
                      breakpoint: 1200,
                      options: {
                        chart: {
                          width: 350,
                          height: 500,
                        },
                        legend: {
                          position: 'bottom',
                          show: true,
                          labels: {
                            useSeriesColors: "true", 
                          }
                        }
                      }
                    }]          
                  }}
                >
                </Chart>
              
                <ResponsiveContainer aspect={windowSize.innerWidth<= 1000 ? (1) : (2)}>
                <BarChart
                  data={alldata}
                  margin={{
                    top: 20,
                    right: 10,
                    left: 20,
                    bottom: -25,
                  }}
                >
                  <CartesianGrid horizontal="true" vertical="" stroke="#243240" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fill:"#fff"}} allowDuplicatedCategory="false" fontSize={windowSize.innerWidth<= 1000 ? (0) : (15)} fil  />
                  <YAxis tick={{fill:"#fff"}} unit={"€"} name="Capital"  />
                  <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} itemStyle={{ color: "#fff" }} cursor={false}  />
                  <Legend legendType="none"/>
                  <Bar dataKey="actual" fill="#26632d" unit={"€"} name={"Capital"}  />
                </BarChart>
              </ResponsiveContainer>

        </div>
        </div>
        </React.Fragment>
    )

}

export default Donut;