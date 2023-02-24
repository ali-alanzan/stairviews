
export const currencyFormatter = data => {
    return (data.amount * 100 / 100).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency
    })
};


export const stripeCurrencyFormatter = (data) => {
    return (data.amount / 100).toLocaleString(data.currency, {
        style: "currency",
        currency: data.currency
    })
};


export async function fetchJSON(url, options) {
    console.log(url, options);
  // const res = await fetch(url, options);
  const response = await axios.get(url);
  if (!response.ok) {
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
