import axios from "axios";
API_EndPoint = ""

const INVESTMENT_ALL = "investment-service:9001/investments/alldata";

class getdata {

    getall(){
    return axios.get(INVESTMENT_ALL);
    }

}

export default new getdata();