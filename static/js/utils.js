export function phone(str){
	let regs = /^1\d{10}$/g;
	return !regs.test(str);
}

export function splitParam(obj){
  let param = '?'
  Object.keys(obj).forEach((k) =>{
    param += k + '=' + obj[k] + '&'
  })
  return param.substr(0,param.length-1);
}
