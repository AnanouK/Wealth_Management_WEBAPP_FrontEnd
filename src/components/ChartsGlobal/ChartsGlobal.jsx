
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import "./ChartsGlobal.css";
import axios from "axios";
import { useState, useEffect} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import { AreaChart } from 'recharts';




export const ChartsGlobal = () => {

  const name = "global";
  const [data, setdata] = useState([]);

  const username = localStorage.getItem('username');
  const INGRESS_API = "34.160.0.103";
  const STATISTICSDATA = "http://" + INGRESS_API + "/statistics/getstatisticsof";
  const CHECKFOREMPTY = "http://" + INGRESS_API + "/statistics/checkempty";
  const DELETEONE = "http://" + INGRESS_API + "/statistics/delete/onestat";
  const [windowSize, setWindowSize] = useState(getWindowSize());

  
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  useEffect(() => {
    getData();
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
        name : "global",
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

    const deleteOne = (Id) =>
    {
      axios.delete(DELETEONE, {
        params: {
          id: Id,
        },
      }).then(() =>{
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
      })}

      const arrow = (e) => {

        if ( e > 0 && e != 100.000)
        {
            return  <span className='up'>
                    <ArrowDropUp className="featuredIcon" fontSize={windowSize.innerWidth<= 1000 ? ("10px") : ("small")}/> 
                    <span className='pourcentageGlobalChart'>{e.toFixed(3)}%</span>
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
          <h2 className='title'> Evolution du patrimoine total : {name}</h2>
        <ResponsiveContainer width="100%" aspect={windowSize.innerWidth<= 1000 ? (1) : (3)}>
        <AreaChart
          data={data.filter(entry => entry.Pourcentage !== 0)}
          margin={{
            top: 15,
            right: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid  horizontal="true" vertical="" stroke="#243240"/>
          <XAxis dataKey="Date" tick={{fill:"#fff"}} padding={{right: 0}}/>
          <YAxis tick={{fill:"#fff"}} unit={"€"} domain={['dataMin', 'dataMax']} padding={{bottom: 20}}/>
          <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
          <Area type="monotone" dataKey="Capital" fill='#8884d8' stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
          
        </AreaChart>
      </ResponsiveContainer>

      <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th className="itemscharts">Date</th>
                <th className="itemscharts">Capital</th>
                <th className='itemschartsactions'>Action</th>
              </tr>
 
            </thead>
            <tbody className="test2">
                {
                    reversedata.map(
                        line => line.Pourcentage !== 0? (
                              <tr className="charts" key={line.Date}>
                                  <td className="cellulecharts"> {line.Date}</td>
                                  <td className="cellulechartscapital"> {line.Capital.toLocaleString()} € {arrow(line.Pourcentage)}</td>
                                  <td className="cellulechartsboutons"><button className='btn btn-danger' onClick={() => deleteOne(line.Id)} style = {{marginLeft : "10px"}}> X</button></td>
                              </tr>)
                              : null
                    )

                }
            </tbody>
            
        </table>
    </div>
    )
}

export default ChartsGlobal;