import { memberAPI } from "./baseInstance";

export const registerGuest = async (nickname :string, address : string) => {
    const response = await memberAPI.post(`/guest`,{
        "address" : address,
        "nickName": nickname
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const deleteGuest = async (guest_id :number) => {
    return await memberAPI.delete(`/guest/${guest_id}`);
};

export const setGuestSession = async (guest :number, session :string) => {
    const response = await memberAPI.post(`/guest/session`,{
        "id": guest,
        "session" : session
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}