import axios from "./index.js"
import {createSerialNumber} from "../../utils/random.js"

//任务列表
export function targetList(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'target/targetList',
    method: 'post',
    data: obj
  });
}
//任务新增
export function targetAdd(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'target/targetEdit',
    method: 'post',
    data: obj
  });
}
