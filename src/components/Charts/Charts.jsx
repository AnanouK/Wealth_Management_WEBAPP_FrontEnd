import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./Charts.css";
import axios from "axios";
import { useState, useEffect} from "react"


export const Charts = () => {

  const {name} = useParams();
  const [data, setdata] = useState([]);

  const {username} = useParams();
  const INGRESS_API = "34.160.0.103";
  const STATISTICSDATA = "http://" + INGRESS_API + "/statistics/getstatisticsof/";
  
  

  useEffect(() => {
    getdata();

  }, [])

  const getdata = () =>{
    axios.get(STATISTICSDATA + name +"/" + username).then(res =>{
      setdata(res.data);
    })}


  var test = data;

    return (
        <div className='container'>
          <h2 className='title'> Evolution du capital de l'investissement : {name}</h2>
        <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={[test]}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid  horizontal="true" vertical="" stroke="#243240"/>
          <XAxis dataKey="Date" tick={{fill:"#fff"}}/>
          <YAxis tick={{fill:"#fff"}} />
          <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
          <Line type="monotone" dataKey="Capital" stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
          
        </LineChart>
      </ResponsiveContainer>

      <table className='table table-bordered table-striped'>
            <thead>
                <th className="items"> Nom</th>
                <th className="items"> Date</th>
                <th className="items"> Capital</th>
 
            </thead>
            <tbody className="test2">
                {
                    data.map(
                        line =>
                        <tr className="test1" key={line.Date}>
                            <td className="cellule"> {name}</td>
                            <td className="cellule"> {line.Date}</td>
                            <td className="cellule"> {line.Capital} €</td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
    </div>
    )
}

export default Charts;