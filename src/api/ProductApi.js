import axiosClient from "./axiosClient";
import { categoryApi } from "./CategoryApi";


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