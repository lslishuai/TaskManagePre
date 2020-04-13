import axios from "./index.js"
import {createSerialNumber} from "../../utils/random.js"

//监督列表
export function supervisionList(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'supervision/supervisionList',
    method: 'post',
    data: obj
  });
}
