import axios from "axios";

const INVESTMENT_BASE_API_URL = "/investments/allinvestments";
const INVESTMENT_ADD = "/investments/addinvestment";

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