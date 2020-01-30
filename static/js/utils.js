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

export function GetRequest(url) {
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(url.indexOf('?') + 1);
    let strs = '';
    strs = str.split('&');
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

export function deepClone(obj) {
  let str = JSON.stringify(obj);
  return JSON.parse(str);
}
