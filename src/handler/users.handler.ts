import axios from 'axios';
import { Product } from './goods.handler';

const BE_URI =
  import.meta.env.VITE_BE_URI ||
  'https://personal-ecoshopper-be.dzlfwq.easypanel.host';

const getToken = () => localStorage.getItem('token');

export interface User {
  display_name: string;
  fullname: string;
  email: string;
  display_picture?: string;
  sustainability_rating: number;
  role: string;
  created_at: string;
}

interface getUserProfileResponse {
  user: User;
  products: Product[];
}

export const getUserProfile = async (): Promise<getUserProfileResponse> => {
  const response = await axios.get(`${BE_URI}/user/profile`, {
    headers: { cookies: `token=${getToken()}` },
  });
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const buyProducts = async (
  productId: string,
  quantity: number,
  token: string,
) => {
  const response = await axios.post(
    `${BE_URI}/user/buy`,
    {
      productId,
      quantity,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};
