import { roomAPI } from "./baseIntance";

export const deletePlayRoom = async (roomId: number, address : string) => {
    const response = await roomAPI.delete(`/${address}`, {
        params: {
            roomId: roomId,
            address : address 
        },
    });
    return response.data;
}

export const createPlayRoom = async (title:string, department :string, memberId: number) => {
    const response = await roomAPI.post(`/create`, {
        "title": title,
        "department" : department,
    }, {
        params: {
            memberId : memberId,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}


export const getMyRoom = async (memberId: number) => {
    const response = await roomAPI.get(`/me`, {
        params: {
            memberId : memberId,
        },
    });
    return response.data;
}

