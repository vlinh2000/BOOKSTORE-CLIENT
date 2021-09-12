import axiosClient from "./axiosClient";
import { categoryApi } from "./CategoryApi";


export const productApi = {

    getAll: (params) => {
        const url = `/books`;
        return axiosClient.get(url, { params });
    },
    get: (bookId) => {
        //custom to get data for product detail page

        return new Promise(async (resolve, reject) => {
            try {
                const url = `/books/${bookId}`;
                const { book } = await axiosClient.get(url);
                //handle get category with that categoryId of above book
                const { category } = await categoryApi.get(book.categoryId);

                resolve({ book, category })
                //handle to get related book;


            } catch (error) {
                reject(error);
            }
        })



    }

}