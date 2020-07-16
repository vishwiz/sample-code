// import * as axios from 'axios';

export default get = () => {

    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos/1',
    //     data: {}
    // }).then((response) => {

    //     console.log("response ", response)

    // }).catch((error) => {

    //     console.log('Error', error);

    // });

    fetch('https://reactnative.dev/movies.json')
        .then((response) => {

            console.log("response ", response.json())

            return response;
        })
        .catch((error) => console.error(error))
    return 0;

}

// export default post = () => {

//     axios({
//         method: 'post',
//         url: '/user/12345',
//         data: {
//             firstName: 'Fred',
//             lastName: 'Flintstone'
//         }
//     });

// }