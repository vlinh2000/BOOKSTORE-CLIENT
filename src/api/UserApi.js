import axiosClient from "./axiosClient";

export const UserApi = {

    getMe: () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const url = '/user'
                try {
                    const { user } = await axiosClient.get(url);
                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        })
    },

    user_login: (data) => {
        //handle login
        return new Promise((resolve, reject) => {

            const url = `/user/login`;
            setTimeout(() => {
                try {
                    const resData = axiosClient.post(url, data);
                    resolve(resData);

                } catch (error) {
                    reject(error)
                }
            }, 1000);
        })



    },
    user_register: (data) => {
        //handle register;
        return new Promise((resolve, reject) => {

            const url = `/user/register`;
            setTimeout(() => {
                try {
                    const resData = axiosClient.post(url, data);
                    resolve(resData);

                } catch (error) {
                    reject(error)
                }
            }, 1000);
        })
    },
    //handle update;
    user_update: (data) => {
        return new Promise((resolve, reject) => {

            const url = `/user/${data.get("id")}`;
            setTimeout(() => {
                try {

                    const resData = axiosClient.patch(url, data);
                    resolve(resData);

                } catch (error) {
                    reject(error)
                }
            }, 1000);
        })
    },




}

