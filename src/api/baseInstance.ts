import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const baseAPI = axios.create({
  baseURL: `${API_URL}`,
});

export const memberAPI = axios.create({
  baseURL: `${API_URL}/member`,
});

export const movieAPI = axios.create({
  baseURL: `${API_URL}/movie`,
});

export const roomAPI = axios.create({
  baseURL: `${API_URL}/room`,
});

export const scriptAPI = axios.create({
  baseURL: `${API_URL}/script`,
});