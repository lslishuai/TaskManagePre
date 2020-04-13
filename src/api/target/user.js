import axios from "./index.js"
import {createSerialNumber} from "../../utils/random.js"

//登录
export function login(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'user/login',
    method: 'post',
    data: obj
  });
}
//id查询用户
export function quaryUserMsg(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'user/quaryUserMsg',
    method: 'post',
    data: obj
  });
}
