import axiosClient from "./axiosClient";

export const categoryApi = {

    get: (categoryId) => {
        const url = `/categories/${categoryId}`;
        return axiosClient.get(url);
    }



}