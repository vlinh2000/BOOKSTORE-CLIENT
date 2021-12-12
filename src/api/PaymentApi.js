import axiosClient from "./axiosClient"

export const PaymentApi = {
    get_All: () => {
        const endpoint = `/payments`;
        return axiosClient.get(endpoint);
    }
}