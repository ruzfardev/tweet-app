import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/QueryExecute/config",
});

axiosInstance.interceptors.response.use(
    (response) => {
        if(response.status === 200) {
            return response.data.data;
        }else {
            console.log(response);
            throw new Error(response.data.detail);
        }

    }
);

