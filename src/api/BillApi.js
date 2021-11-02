import axiosClient from "./axiosClient"

export const billApi = {

    getAll: () => {
        const url = `/bills`
        return axiosClient.get(url);
    },
    post: data => {
        return new Promise((resolve, reject) => {

            const url = '/bills'
            setTimeout(async () => {
                try {
                    const resData = await axiosClient.post(url, data);
                    resolve(resData);

                } catch (error) {
                    reject(error)
                }
            }, 2000)


        })
    },
    update: (params, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/bills/${params}`
                    const resData = await axiosClient.patch(url, data);
                    resolve(resData);

                } catch (error) {
                    reject(error)
                }
            }, 2000)


        })
    }
}