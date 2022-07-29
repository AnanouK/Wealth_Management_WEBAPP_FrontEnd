import axios from "axios";
import { toast } from "react-toastify";

const INGRESS_API = "34.160.0.103";
const INVESTMENT_BASE_API_URL = "http://" + INGRESS_API + "/investments/allinvestments";
const INVESTMENT_ADD_INVESTMENT_SERVICE = "http://" + INGRESS_API + "/investments/addinvestment";
const INVESTMENT_ADD_STATISTICS_SERVICE = "http://" + INGRESS_API + "/statistics/addstatistic";
const INVESTMENT_UPDATE = "http://" + INGRESS_API + "/investments/update";

class InvestmentService {

    getAllInvestments(){
        return axios.get(INVESTMENT_BASE_API_URL)
    }

    saveInvestment(investment){
        axios.post(INVESTMENT_ADD_INVESTMENT_SERVICE, investment).then(response => {
            if(response.status === 405)
            {

            }
            else {
                axios.post(INVESTMENT_ADD_STATISTICS_SERVICE, investment);
            }
        })
        
    }

    updateInvestment(investment,id)
    {
        axios.put(INVESTMENT_UPDATE,investment, {
            params: {
              id: id,
            },
          });
        axios.post(INVESTMENT_ADD_STATISTICS_SERVICE, investment);
    }

    getInvestmentById(investmentId)
    {
        return axios.get()
    }


}

export default new InvestmentService();