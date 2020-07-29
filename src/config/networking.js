import axios from 'axios';
import baseURL from '../../baseURL';

const postReq = async (params) => {
    try {
        const response = await axios(baseURL + params.endurl, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 3000,
            data: JSON.stringify(params.requestData),
        });
        const data = await response;


        console.log("data data ", data, data.status)


        return { data: data, status: response.status };
    } catch (error) {
        console.log('error : ', error);
        return {
            data: "error",
            status: 404
          }
    }
};

// const getReq = function (url, params, headers, timeout, isDownload = false, success, error) {

//     return new Promise((resolve, reject) => {
//         axios({
//             method: 'get',
//             url: url,
//             params: params,
//             timeout: timeout,
//             headers: headers,
//         }).then(function (response) {
//             resolve(response);
//         }).catch(error => {
//             reject(error);
//         });
//     });
// }

export { postReq };