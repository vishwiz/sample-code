import baseURL from '../../baseURL';

get = async () => {
  try {
    const response = await fetch(baseURL + params.endurl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      data: "error",
      status: 404
    }
  }
};

post = async (params) => {

  console.log("url : ",baseURL + params.endurl);
  console.log("requestData : ",params.requestData);

  try {
    const response = await fetch(baseURL + params.endurl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.requestData),
    });
    const data = await response.json();

    console.log("data : ",data);
    return { data: data, status: response.status };
  } catch (error) {

    console.log("error : ",error);

    return {
      data: "error",
      status: 404
    }
  }
};

export default { get, post };
