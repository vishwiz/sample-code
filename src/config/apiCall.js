import baseURL from '../../baseURL';

get = async () => {

    try {
        const response = await fetch('https://reactnative.dev/movies.json')
        const data = await response.json();
        return data
    } catch (error) {

        console.log("error : ", error);

    }

}

post = async (params) => {

    try {
        const response = await fetch(baseURL + params.endurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.requestData)
        });
        const data = await response.json();
        return data
    } catch (error) {

        console.log("error : ", error);

    }



}

export default { get, post }