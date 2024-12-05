import axios from 'axios';
import { Product } from './goods.handler';

const BE_URI =
  import.meta.env.VITE_BE_URI ||
  'https://personal-ecoshopper-be.dzlfwq.easypanel.host';

interface Producer {
  id: string;
  producer_name: string;
  producer_location: string;
  producer_description: string;
  producer_image?: string;
  created_at: string;
}

export const getProducers = async (): Promise<Producer[]> => {
  const response = await axios.get(`${BE_URI}/producers`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getProducer = async (id: string): Promise<Producer> => {
  const response = await axios.get(`${BE_URI}/producers/producer/${id}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getProducerGoods = async (
  producer_id: string,
): Promise<Product[]> => {
  const response = await axios.get(`${BE_URI}/producers/goods/${producer_id}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getProducerByName = async (name: string): Promise<Producer> => {
  const response = await axios.get(`${BE_URI}/producers/name/${name}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getProducerByLocation = async (
  location: string,
): Promise<Producer[]> => {
  const response = await axios.get(`${BE_URI}/producers/location/${location}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};
