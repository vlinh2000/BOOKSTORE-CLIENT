import axiosClient from "./axiosClient"

export const billApi = {

    get: (params) => {
        const url = `/bills/${params}`
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
    }
}