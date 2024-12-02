import axios from "axios";

const BE_URI = import.meta.env.VITE_BE_URI;

const getToken = () => localStorage.getItem("token");

export const getUserProfile = async () => {
    const response = await axios.get(`${BE_URI}/users/profile`, {
        headers: { cookies: `token=${getToken()}` }
    });
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const buyProducts = async (productId: string, quantity: number) => {
    const response = await axios.post(`${BE_URI}/users/buy`, {
        productId, quantity
    }, {
        headers: { cookies: `token=${getToken()}` }
    });
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}