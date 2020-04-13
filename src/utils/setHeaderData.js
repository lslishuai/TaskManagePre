import {createSerialNumber} from "../utils/random.js"

export default {
  headers: {
    'Content-Type':'application/json',
    "Seqno": createSerialNumber(),
    "userId":"0002"
  }
}
