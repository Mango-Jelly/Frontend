import { scriptAPI } from "./baseIntance";

export const getScript = async (scriptId: number) => {
    const response = await scriptAPI.get(`/`, {
        params: {
            scriptId : scriptId,
        },
    });
    return response.data;
}

export const getScriptList = async () => {
    const response = await scriptAPI.get(`/list`);
    return response.data;
}