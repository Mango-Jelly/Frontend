import { baseAPI, scriptAPI } from './baseInstance';

export const getScript = async (scriptId: number) => {
  const response = await baseAPI.get(`/script?scriptId=${scriptId}`);
  return response.data;
};

export const getScriptList = async () => {
  const response = await scriptAPI.get(`/list`);
  return response.data;
};
