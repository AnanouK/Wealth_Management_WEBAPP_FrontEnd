import axios from "axios";

const INVESTMENT_BASE_API_URL = "http://investment-service-svc.default.svc.cluster.local/investments/allinvestments";
const INVESTMENT_ADD = "http://investment-service-svc.default.svc.cluster.local/investments/addinvestment";

class InvestmentService {

    getAllInvestments(){
        return axios.get(INVESTMENT_BASE_API_URL)
    }

    saveInvestment(investment){
        return axios.post(INVESTMENT_ADD, investment)
    }

    getInvestmentById(investmentId)
    {
        return axios.get()
    }


}

export default new InvestmentService();