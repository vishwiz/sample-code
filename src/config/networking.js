import axios from 'axios'
import baseURL from '../../baseURL';

postReq = async (params) => {
    console.log("baseURL + params.endurl ", baseURL + params.endurl)
    try {
        const response = await axios(baseURL + params.endurl, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30000,
            data: params.requestData,
        });
        const data = await response.data;
        console.log("data data ", data, response.status)
        return { data: data, status: response.status };
    } catch (error) {
        console.log("error : ", error);

        return {
            data: "error",
            status: 404
        }
    }
};

getReq = async (params) => {
    console.log("baseURL + params.endurl ", baseURL + params.endurl)
    try {
        const response = await axios(baseURL + params.endurl, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30000,
            // data: params.requestData,
        });
        const data = await response.data;
        console.log("data data ", data, response.status)
        return { data: data, status: response.status };
    } catch (error) {
        console.log("error : ", error);

        return {
            data: "error",
            status: 404
        }
    }
};

export default { postReq, getReq };
