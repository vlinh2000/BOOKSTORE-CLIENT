import axiosClient from "./axiosClient";

export const feedBackApi = {
    getAll: () => {
        const url = `/feedBack`;
        return axiosClient.get(url);
    },
    get: (bookId) => {
        return new Promise((resolve, reject) => {
            try {
                const url = `/feedBack/${bookId}`;

                setTimeout(async () => {
                    const data = await axiosClient.get(url);
                    resolve(data);
                }, 500);

            } catch (error) {
                reject(error);
            }

        })
    },
    post: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const url = `/feedBack/`;

                setTimeout(() => {
                    axiosClient.post(url, data);
                    resolve(true);
                }, 500);

            } catch (error) {
                reject(error);
            }


        })
    }
}