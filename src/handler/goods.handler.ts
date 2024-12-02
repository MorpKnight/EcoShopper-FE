import axios from "axios";

const BE_URI = import.meta.env.VITE_BE_URI;

export const getProducts = async () => {
    const response = await axios.get(`${BE_URI}/goods`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get(`${BE_URI}/goods/${id}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getGoodsByCategory = async (category: string) => {
    const response = await axios.get(`${BE_URI}/goods/category/${category}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getGoodsByName = async (name: string) => {
    const response = await axios.get(`${BE_URI}/goods/name/${name}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getGoodsBySR = async (sr: string) => {
    const response = await axios.get(`${BE_URI}/goods/sr/${sr}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getGoodsByProducer = async (producer: string) => {
    const response = await axios.get(`${BE_URI}/goods/producer/${producer}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const goodsAlternative = async (alternative: string) => {
    const response = await axios.get(`${BE_URI}/goods/alternative/${alternative}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}
