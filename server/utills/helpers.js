// import axios from 'axios';


// export const currencyFormatter = data => {
//     return (data.amount * 100 / 100).toLocaleString(data.currency, {
//         style: "currency",
//         currency: data.currency
//     })
// };


// export const stripeCurrencyFormatter = (data) => {
//     return (data.amount / 100).toLocaleString(data.currency, {
//         style: "currency",
//         currency: data.currency
//     })
// };



export async function fetchJSON(url, options) {
    // console.log(url, options);
  // const axios = await import("axios");
  // const res = await fetch(url, options);

  // if (!res.ok) {
  //   return new Error(`Failed ${res.status}`);
  // }

  let json;
  try {
    const axios = require('axios');
    const res = await axios.get(url);

    json = await res.then(res => res.json());
    
  //   console.log(json);
  } catch(err) {
    json = {}
    console.log("err", err);
  }
  console.log("json", json);
  return json 
}
