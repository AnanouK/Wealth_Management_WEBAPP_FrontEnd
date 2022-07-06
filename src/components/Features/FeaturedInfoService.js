import axios from "axios";

const INVESTMENT_ALL = "/investments/alldata";

class getdata {

    getall(){
    return axios.get(INVESTMENT_ALL);
    }

}

export default new getdata();