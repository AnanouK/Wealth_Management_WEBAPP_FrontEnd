
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./ChartsGlobal.css";
import axios from "axios";
import { useState, useEffect} from "react"
import { useUserContext } from '../../utils/UserContext';


export const ChartsGlobal = () => {

  const name = "global";
  const [data, setdata] = useState([]);

  const {username} = useUserContext();
  const INGRESS_API = "34.160.0.103";
  const STATISTICSDATA = "http://" + INGRESS_API + "/statistics/getstatisticsof";
  const DELETEONE = "http://" + INGRESS_API + "/statistics/delete/onestat";
  
  

  useEffect(() => {
    getdata();
    window.scrollTo(0, 0);

  }, [])

  const getdata = () =>{
    axios.get(STATISTICSDATA, {
      params: {
        investmentName: name,
        clientUsername : username,
      },
    }).then(res =>{
      setdata(res.data);
    })}

    const deleteone = (Id) =>
    {
      axios.delete(DELETEONE, {
        params: {
          id: Id,
        },
      }).then(res =>{
        setTimeout(getdata(),1000);
      })}


    return (
        <div className='newcontainer'>
          <h2 className='title'> Evolution du patrimoine total : {name}</h2>
        <ResponsiveContainer width="90%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={data}
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
                <th className="items">Date</th>
                <th className="items">Capital</th>
                <th className='items'>Action</th>
 
            </thead>
            <tbody className="test2">
                {
                    data.map(
                        line =>
                        <tr className="test1" key={line.Date}>
                            <td className="cellule"> {line.Date}</td>
                            <td className="cellule"> {line.Capital} €</td>
                            <td className="celluleboutons"><button className='btn btn-danger' onClick={() => deleteone(line.Id)} style = {{marginLeft : "10px"}}> X</button></td>
                        </tr>
                    )
                }
            </tbody>
            
        </table>
    </div>
    )
}

export default ChartsGlobal;