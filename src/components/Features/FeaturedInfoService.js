import axios from "axios";

const INVESTMENT_ALL = "http://investment-service.default.svc.cluster.local/investments/alldata";

class getdata {

    getall(){
    return axios.get(INVESTMENT_ALL);
    }

}

export default new getdata();