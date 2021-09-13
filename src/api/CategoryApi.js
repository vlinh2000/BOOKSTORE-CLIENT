import axiosClient from "./axiosClient";

export const categoryApi = {
    getAll: () => {
        const url = `/categories`;
        return axiosClient.get(url);
    }
    ,
    get: (categoryId) => {
        const url = `/categories/${categoryId}`;
        return axiosClient.get(url);
    }



}