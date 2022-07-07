import axios from "axios";

const INVESTMENT_BASE_API_URL = "http://34.160.0.103.500/investments/allinvestments";
const INVESTMENT_ADD = "http://34.160.0.103.500/investments/addinvestment";

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