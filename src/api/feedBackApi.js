import axiosClient from "./axiosClient";

export const feedBackApi = {
    getAll: () => {
        const url = `/feedBack`;
        return axiosClient.get(url);
    },
    get: (bookId) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/feedBack/${bookId}`;
                    const data = await axiosClient.get(url);
                    resolve(data);

                } catch (error) {
                    reject(error);
                }
            }, 500);

        })
    },
    post: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const url = `/feedBack/`;

                setTimeout(() => {
                    const dataRes = axiosClient.post(url, data);
                    resolve(dataRes);
                }, 500);

            } catch (error) {
                reject(error);
            }


        })
    }
}