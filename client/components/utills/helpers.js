// import * as axios from 'axios';

export async function fetchJSON(url, options) {
    console.log(url, options);
    const axios = require('axios');

//   const res = await fetch(url, options);
  const res = await axios.get(url);
  // console.log("1111", res);
  // return 0;
  if (res.status != 200) {
    return new Error(`Failed ${res.status}`);
  }
  let json;
  try {
    json = await res.then(res => res.json());
    
  } catch(err) {
    json = {}
  }
  console.log(json);
  return json 
}
