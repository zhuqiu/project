export function phone(str){
	let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/g;
	return !regs.test(str);
}

export function splitParam(obj){
  let param = '?'
  Object.keys(obj).forEach((k) =>{
    param += k + '=' + obj[k] + '&'
  })
  return param.substr(0,param.length-1);
}
