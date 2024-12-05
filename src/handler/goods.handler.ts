import axios from 'axios';

const BE_URI =
  import.meta.env.VITE_BE_URI ||
  'https://personal-ecoshopper-be.dzlfwq.easypanel.host';

export interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_category: string;
  product_price: number;
  product_image: string;
  product_sustainability_rating: number;
  product_producer_id: string;
  product_type: 'food' | 'non-food';
  is_organic: boolean;
  food_subcategory?: string;
  created_at: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${BE_URI}/goods`);
  if (response.status !== 200) throw new Error(response.data.error);

  console.log('Fetched products:', response.data);
  return response.data.goods;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(`${BE_URI}/goods/${id}`);
  if (response.status !== 200) throw new Error(response.data.error);

  console.log('Fetched product:', response.data.good);
  return response.data.good;
};

export const getGoodsByCategory = async (category: string) => {
  const response = await axios.get(`${BE_URI}/goods/category/${category}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getGoodsByName = async (name: string) => {
  const response = await axios.get(`${BE_URI}/goods/name/${name}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getGoodsBySR = async (sr: string) => {
  const response = await axios.get(`${BE_URI}/goods/sr/${sr}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const getGoodsByProducer = async (producer: string) => {
  const response = await axios.get(`${BE_URI}/goods/producer/${producer}`);
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const goodsAlternative = async (alternative: string) => {
  const response = await axios.get(
    `${BE_URI}/goods/alternative/${alternative}`,
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};
