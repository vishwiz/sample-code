import axios from 'axios'
import baseURL from '../../baseURL';

postReq = async (params) => {
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
        return { data: data, status: response.status };
    } catch (error) {
        return {
            data: "error",
            status: 404
        }
    }
};

getReq = async (params) => {
    try {
        const response = await axios(params.endurl, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });
        const data = await response.data;

        
        return { data: data, status: response.status };
    } catch (error) {
        return {
            data: "error",
            status: 404
        }
    }
};

export default { postReq, getReq };
