import axios from "axios";

const BE_URI = import.meta.env.VITE_BE_URI;

export const getProducers = async () => {
    const response = await axios.get(`${BE_URI}/producers`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getProducer = async (id: string) => {
    const response = await axios.get(`${BE_URI}/producers/producer/${id}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getProducerGoods = async (producer_id: string) => {
    const response = await axios.get(`${BE_URI}/producers/goods/${producer_id}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getProducerByName = async (name: string) => {
    const response = await axios.get(`${BE_URI}/producers/name/${name}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}

export const getProducerByLocation = async (location: string) => {
    const response = await axios.get(`${BE_URI}/producers/location/${location}`);
    if(response.status !== 200) throw new Error(response.data.error);

    return response.data;
}
