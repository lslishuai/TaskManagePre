// 随机流水号
export function createSerialNumber() {
  let rq = new Date();
  let sj = rq.toISOString().substring(0,10)+rq.toTimeString().substring(0,9);
  sj=sj.replace("-", "")
  sj=sj.replace("-", "")
  sj=sj.replace(":", "")
  sj=sj.replace(":", "")
  sj=sj.replace(" ", "")
  let seqno ='JTPC'+sj+(Math.random().toString(36).substr(2,6)).toUpperCase()
  return seqno;
}
