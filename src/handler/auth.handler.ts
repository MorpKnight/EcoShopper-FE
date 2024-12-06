import axios from 'axios';

const BE_URI =
  import.meta.env.VITE_BE_URI ||
  'https://personal-ecoshopper-be.dzlfwq.easypanel.host';

export const registerEmail = async (
  email: string,
  password: string,
  displayname: string,
  fullname: string,
) => {
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    throw new Error('Invalid email address');
  if (password.length < 8)
    throw new Error('Password must be at least 8 characters long');

  const response = await axios.post(`${BE_URI}/auth/register`, {
    email,
    password,
    displayname,
    fullname,
  });

  if (response.status !== 200) throw new Error(response.data.error);
  return response.data;
};

export const loginEmail = async (email: string, password: string) => {
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    throw new Error('Invalid email address');
  if (password.length < 8)
    throw new Error('Password must be at least 8 characters long');
  const response = await axios.post(`${BE_URI}/auth/login`, {
    email,
    password,
  });

  if (response.status !== 200) throw new Error(response.data.error);

  localStorage.setItem('token', response.data.token);
  return { message: response.data.message };
};

export const loginEmailAdmin = async (email: string, password: string) => {
  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    throw new Error('Invalid email address');
  if (password.length < 8)
    throw new Error('Password must be at least 8 characters long');
  const response = await axios.post(`${BE_URI}/auth/login-admin`, {
    email,
    password,
  });

  if (response.status !== 200) throw new Error(response.data.error);

  localStorage.setItem('token', response.data.token);
  return { message: response.data.message };
}