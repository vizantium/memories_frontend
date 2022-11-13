import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://mernmemoriesback.herokuapp.com/'
});

instance.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export default instance