import { scriptAPI } from "./baseInstance";

export const getScript = async (scriptId: number) => {
    const response = await scriptAPI.get(`?id=#${scriptId}`);
    return response.data;
}

export const getScriptList = async () => {
    const response = await scriptAPI.get(`/list`);
    return response.data;
}