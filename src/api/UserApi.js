import axiosClient from "./axiosClient";

export const UserApi = {

    getMe: () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const url = '/user'
                try {
                    const { user } = await axiosClient.get(url);
                    resolve({
                        name: user.name,
                        key: user.key,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        userName: user.userName,
                        passWord: user.passWord
                    });

                } catch (error) {
                    reject(error);
                }
            }, 1000);
        })
    },

    user_login: (data) => {
        //handle login
        const url = `/user/login`;
        return axiosClient.post(url, data);

    },
    user_register: (data) => {
        //handle register;
        const url = `/user/register`;
        return axiosClient.post(url, data);
    }



}

