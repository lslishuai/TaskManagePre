import axios from "./index.js"
import {createSerialNumber} from "../../utils/random.js"

//奖品列表
export function prizeList(obj) {
  obj.seqno = createSerialNumber;
  return axios({
    url: 'prize/prizeList',
    method: 'post',
    data: obj
  });
}
// //奖品新增
// export function prizeAdd(obj) {
//   obj.seqno = createSerialNumber;
//   return axios({
//     url: 'prize/prizeEdit',
//     method: 'post',
//     data: obj
//   });
// }
//奖品新增
export function prizeAdd(obj) {
  obj.seqno = createSerialNumber;
  let formData = new FormData();
  formData.append("multiFile", obj);  // 文件对象
  return fetch('prize/prizeEdit',{
    method: 'POST',
    body: formData
  })
}
