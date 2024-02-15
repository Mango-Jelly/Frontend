import { roomAPI } from "./baseInstance";

type Room = {
    title: string,
    department: string,
    visible: boolean,
    AccessToken: string
}

export const deletePlayRoom = async (address: string, AccessToken: string) => {
    const response = await roomAPI.delete(`/${address}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
}

export const createPlayRoom = async ({ title, department, visible, AccessToken }: Room) => {
    const response = await roomAPI.post(`/create`, {
        "title": title,
        "department": department,
        "visible": visible
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
    return response.data;
}

export const registerFullVideo = async (roomUUID: string, AccessToken: string) => {
    const response = await roomAPI.post(`/movie/${roomUUID}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
    return response.data;
}

export const getMyPlayRoomInfo = async (AccessToken: string) => {
    const response = await roomAPI.get(`/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
    return response.data;
}

export const startPlay = async (roomUUID: string) => {
    const response = await roomAPI.post(`/begin/${roomUUID}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

