import axios from 'axios';

const BE_URI =
  import.meta.env.VITE_BE_URI ||
  'https://personal-ecoshopper-be.dzlfwq.easypanel.host';

const getToken = () => localStorage.getItem('token');

export const addProduct = async (
  name: string,
  description: string,
  category: string,
  price: string,
  image: string,
  sustainability_rating: string,
  producer_id: string,
) => {
  const response = await axios.post(
    `${BE_URI}/admin/add-product`,
    {
      name,
      description,
      category,
      price,
      image,
      sustainability_rating,
      producer_id,
    },
    {
      headers: { cookies: `token=${getToken()}` },
    },
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const addProducer = async (
  name: string,
  location: string,
  description: string,
  image: string,
) => {
  const response = await axios.post(
    `${BE_URI}/admin/add-producer`,
    {
      name,
      location,
      description,
      image,
    },
    {
      headers: { cookies: `token=${getToken()}` },
    },
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const editProduct = async (
  id: string,
  name: string,
  description: string,
  category: string,
  price: string,
  image: string,
  sustainability_rating: string,
  producer_id: string,
) => {
  const response = await axios.put(
    `${BE_URI}/admin/edit-product`,
    {
      id,
      name,
      description,
      category,
      price,
      image,
      sustainability_rating,
      producer_id,
    },
    {
      headers: { cookies: `token=${getToken()}` },
    },
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const editProducer = async (
  id: string,
  name: string,
  location: string,
  description: string,
  image: string,
) => {
  const response = await axios.put(
    `${BE_URI}/admin/edit-producer`,
    {
      id,
      name,
      location,
      description,
      image,
    },
    {
      headers: { cookies: `token=${getToken()}` },
    },
  );
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${BE_URI}/admin/delete-product`, {
    data: { id },
    headers: { cookies: `token=${getToken()}` },
  });
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};

export const deleteProducer = async (id: string) => {
  const response = await axios.delete(`${BE_URI}/admin/delete-producer`, {
    data: { id },
    headers: { cookies: `token=${getToken()}` },
  });
  if (response.status !== 200) throw new Error(response.data.error);

  return response.data;
};
