import axios from "axios";
import { toast } from "react-toastify";

const INGRESS_API = "34.160.0.103";
const INVESTMENT_BASE_API_URL = "http://" + INGRESS_API + "/investments/allinvestments";
const INVESTMENT_ADD_INVESTMENT_SERVICE = "http://" + INGRESS_API + "/investments/addinvestment";
const INVESTMENT_ADD_STATISTICS_SERVICE = "http://" + INGRESS_API + "/statistics/addstatistic";
const INVESTMENT_UPDATE = "http://" + INGRESS_API + "/investments/update";
const INVESTMENT_GETACTUAL = "http://" + INGRESS_API + "/investments/allactual";

class InvestmentService {

    getAllInvestments(){
        return axios.get(INVESTMENT_BASE_API_URL)
    }

    saveInvestment(investment, username){
        axios.post(INVESTMENT_ADD_INVESTMENT_SERVICE, investment).then(response => {
            if(response.status === 405)
            {

            }
            else {
                axios.post(INVESTMENT_ADD_STATISTICS_SERVICE, investment);
                axios.get(INVESTMENT_GETACTUAL, {
                    params: {
                      username: username,
                    },
                  }).then(response => {
                    var actual = response.data;
                    var today = new Date();
                    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                    var global = {name:"global",start:date,capital:0,actual:actual,username:username};
                    axios.post(INVESTMENT_ADD_STATISTICS_SERVICE,global);
                  });
            }
        })
        
    }

    updateInvestment(investment,id,username)
    {
        axios.put(INVESTMENT_UPDATE,investment, {
            params: {
              id: id,
            },
          });
        axios.post(INVESTMENT_ADD_STATISTICS_SERVICE, investment);
        axios.get(INVESTMENT_GETACTUAL, {
          params: {
            username: username,
          },
        }).then(response => {
          var actual = response.data;
          var today = new Date();
          var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
          var global = {name:"global",start:date,capital:0,actual:actual,username:username};
          axios.post(INVESTMENT_ADD_STATISTICS_SERVICE,global);
        });
    }

    getInvestmentById(investmentId)
    {
        return axios.get()
    }


}

export default new InvestmentService();