const API_PATH = "http://localhost:8080/v1/report"
export default async (params: any) => {
  let url = API_PATH;
  console.log(params)
  if(params && Object.keys(params)){
    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    url += '?' + query;
  }
  const res = await fetch(url);
  return await res.json();
};
