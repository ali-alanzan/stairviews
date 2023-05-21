import axios from 'axios';


export function getStoredUser () {
  let user = {};
  try {
    user = JSON.parse(window.localStorage.user);
  } catch(err) {
    // console.log(err);
  }
  return user;
}

// export function getClientId() {
//   dotenv.config()
//   console.log(11111111111111, process.env.CLIENT_ID);
// console.log(process.env) //
// return process.env.CLIENT_ID;
// }


export async function fetchJSON(url, options) {
  const res = await axios.get(url, options);
  // if (!res.ok) {
    // throw new Error(`Failed ${res.status}`);
  // }
  return res;
}


export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}




export function randomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}


export function displayDurationFromVideo(duration) {
  let result = duration;
  let amountInMinute  =  0;
  let finalizedAmount  =  0;
  switch(true) {
    case duration > 60:
      amountInMinute = Math.trunc(duration / 60);
      const amountInHours = Math.trunc(amountInMinute / 60);
      let restOfS = (duration % 60)-1;
      const restOfM = amountInMinute % 60 < 10 ? "0"+(amountInMinute % 60) : amountInMinute % 60; 
      finalizedAmount = amountInHours + ":" + restOfM + ":" +  (restOfS < 10 ? "0"+restOfS : restOfS);
      break;
    case duration == 60:
      result = 1;
    break;
    case duration > 10:
      result   = "0."+duration;
    break;
    default:
      amountInMinute = (duration / 60).toLocaleString();
      const pointBreakPoint = amountInMinute.indexOf(".");
      finalizedAmount = amountInMinute.substring(pointBreakPoint, 0, pointBreakPoint+2);
      break;
  }
  return finalizedAmount;
}