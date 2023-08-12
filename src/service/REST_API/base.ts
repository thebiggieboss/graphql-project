import axios from "axios";
const BaseUrl = import.meta.env.VITE_APP_BASE_URL;

const CancelerToken = () => axios.CancelToken.source();
const Provider = axios.create({
    headers: {
        Accept: "vnd.github+json",
    },
    baseURL: `${BaseUrl}`,
    timeout: 100000
})

Provider.interceptors.request.use(async (request) => {
    // request.headers["Authorization"] = MyToken
    return request
})

export { Provider, BaseUrl, CancelerToken }