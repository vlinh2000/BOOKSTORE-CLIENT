import axiosClient from "./axiosClient";


export const productApi = {

    getAll: (params) => {
        const url = `/books`;
        return axiosClient.get(url, { params });
    },
    get: (bookId) => {
        //custom to get data for product detail page
        const url = `/books/${bookId}`;
        return axiosClient.get(url);

    }

}