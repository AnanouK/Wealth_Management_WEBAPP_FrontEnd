import { useParams } from 'react-router-dom';
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./Charts.css";
import axios from "axios";
import { useState, useEffect} from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import { AreaChart, Area } from 'recharts';
import InvestmentService from "../../services/InvestmentService"



export const Charts = () => {

  const {name} = useParams();
  const [data, setdata] = useState([]);

  const username = localStorage.getItem('username');
  const INGRESS_API = "34.160.0.103";
  const STATISTICSDATA = "http://" + INGRESS_API + "/statistics/getstatisticsof";
  const CHECKFOREMPTY = "http://" + INGRESS_API + "/statistics/checkempty";
  const DELETEONE = "http://" + INGRESS_API + "/statistics/delete/onestat";
  const GETMONTHLYPERCENTAGE = "http://" + INGRESS_API + "/statistics/getMonthlyPercentage";
  const GETMONTHLYEARN = "http://" + INGRESS_API + "/statistics/getMonthlyEarn";
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [getMonthlyEarn, setMonthlyEarn] = useState(0);

  
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
  
  

  useEffect(() => {
    getData();
    monthlyPercentage();
    monthlyEarn();
    window.scrollTo(0, 0);
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };


  }, [])

  const getData = () =>{
    axios.get(CHECKFOREMPTY, {
      params: {
        username : username,
        name : name,
      },
    }).then(() => {
      axios.get(STATISTICSDATA, {
        params: {
          investmentName: name,
          clientUsername : username,
        },
      }).then(res =>{
        setdata(res.data);
       
      })})
    }

    const deleteone = (Id) =>
    {
      axios.delete(DELETEONE, {
        params: {
          id: Id,
        },
      }).then(res =>{
        setTimeout(getData(),1000);
        toast.success("Supprimé avec succès !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }); 
      })
      if(Id === reversedata[0].Id)
      {
        //If the last recent row was deleted, need to update the wallet 
      }
    
    }


    const monthlyPercentage = () => {
      axios.get(GETMONTHLYPERCENTAGE, {
        params: {
          username: username,
          name: name,
        },
      }).then(response => {
        setMonthlyRate(response.data);
      });
    }

    const monthlyEarn = () => {
      axios.get(GETMONTHLYEARN, {
        params: {
          name: name,
          username: username,
        },
      }).then(response => {
        setMonthlyEarn(response.data);
      });
    }

      const arrow = (e) => {

        if( e === "deposit")
        {
          return <span className='deposit'>Dépôt</span>
        } 
        
        else if ( e > 0 && e !== 100.000)
        {
            return  <span className='up'>
                    <ArrowDropUp className="featuredIcon" fontSize={windowSize.innerWidth<= 1000 ? ("10px") : ("small")}/> 
                    <span className='percentageGlobalChart'>{e.toFixed(3)}%</span>
                    </span>
        }   
        

        else if (e < 0)
        {
            return   <span className='down'>
                    <ArrowDropDown className="featuredIconnegative" fontSize={windowSize.innerWidth<= 1000 ? ("10px") : ("small")}/>
                    <span>{e.toFixed(3)}%</span>
                    </span> 
        }

        }

      var reversedata = [...data].reverse();

    return (
        <div className='newcontainer'>
          <h2 className='title'> Evolution du capital de : {name}</h2>
        <ResponsiveContainer width="100%" aspect={windowSize.innerWidth<= 1000 ? (1) : (4)}>
        <AreaChart
          data={data.filter(entry => entry.Percentage === "deposit" || entry.Percentage !== 0 || entry === data[0])}
          margin={{
            top: 15,
            right: 12,
            bottom: 5,
            left: 20,
          }}
        >
          <CartesianGrid  horizontal="true" vertical="" stroke="#243240" strokeDasharray="3 3"/>
          <XAxis dataKey="Date" tick={{fill:"#fff"}} name="Date" allowDuplicatedCategory="false" hide={windowSize.innerWidth<= 1000 ? (true) : (false)} />
          <YAxis tick={{fill:"#fff"}} unit={"€"} name="Capital" padding={{bottom: 10}} domain={['dataMin', 'dataMax']} />
          <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
          <Area type="monotone" dataKey="Capital" fill='#8884d8' stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
          
        </AreaChart>
      </ResponsiveContainer>

      <div className='percentage'>
          <p className='monthlyPercentageAndEarn'>Pourcentage sur le mois en cours : {monthlyRate.toFixed(3)}%</p>
          <p className='monthlyEarn'>Bénéfice sur le mois en cours : {getMonthlyEarn.toFixed(3)}€</p>
      </div>

      <table className='table table-bordered'>
            <thead>
                <th className="items">Date</th>
                <th className="items">Capital</th>
                <th className='items'>Action</th>
 
            </thead>
            <tbody className="test2">
                {
                    reversedata.map(
                      line =>  line.Percentage === "deposit" ||  line.Percentage !== 0 || line === data[0] ? (
                        <tr className="charts" key={line.Date}>
                            <td className="cellulecharts"> {line.Date}</td>
                            <td className="cellulechartscapital"> {line.Capital.toLocaleString()} € {arrow(line.Percentage)}</td>
                            <td className="cellulechartsboutons"><button className='btn btn-danger' onClick={() => deleteone(line.Id)} style = {{marginLeft : "10px"}}> X</button></td>
                        </tr>)
                        : null
                    )
                }
            </tbody>
            
        </table>
        <div className='fill' hidden={windowSize.innerWidth<= 1000 ? (false) : (true)}></div>
    </div>
    )
}

export default Charts;