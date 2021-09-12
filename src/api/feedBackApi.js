import axiosClient from "./axiosClient";

export const feedBackApi = {
    getAll: () => {
        const url = `/feedBack`;
        return axiosClient.get(url);
    },
    get: (bookId) => {
        const url = `/feedBack/${bookId}`;
        return axiosClient.get(url);

    }
}