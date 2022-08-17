import axios from "axios";
import { useState, useEffect} from "react"
import { useUserContext } from '../../utils/UserContext';
import React from "react";
import  Chart  from "react-apexcharts";
import "./Donut.css"

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
                height={550}
                series={capital}   

                options={{
                    noData:{text:"Pas de données"},                        
                    labels: name,  
                    legend: {position: "right"},
                    responsive: [{
                      breakpoint: 1200,
                      options: {
                        chart: {
                          width: 350,
                          height: 350,
                        },
                        legend: {
                          position: 'bottom',
                          show: false,
                        }
                      }
                    }]          
                  }}
                >
                </Chart>
                
                {windowSize.innerWidth >= 1000 ? (
                  <Chart
                  
                  type="pie"
                  width={550}
                  height={550}
                  series={capital}   
                      
                  options={{
                        noData:{text:"Pas de données"},                        
                        labels: name,  
                        legend: {position: "right"},
                        responsive: [{
                          breakpoint: 1200,
                          options: {
                            chart: {
                              width: 350,
                              height: 350,
                            },
                            legend: {
                              position: 'bottom',
                              show: false,
                            }
                          }
                        }]          
                      }}
                  >
                  </Chart>
              ) : (null)}

        </div>
        </div>
        </React.Fragment>
    )

}

export default Donut;