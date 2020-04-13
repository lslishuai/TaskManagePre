/*
* Created by zxy on 2019-10-06-->
*/
import axios from 'axios'
// import {baseUrlLedger} from "../index";
import setRequestHeader from "../../utils/setHeaderData"
// import {interceptors} from "../interceptor";

const service = axios.create({
  // baseURL: baseUrlLedger,
  baseURL:"/api/qiu",
  // baseURL:"http://10.99.150.70:9160/ms-conplan-server",
  responseType: 'json',
  timeout: 5000,
  ...setRequestHeader
});
// interceptors(service);


export default service
