import { memberAPI } from "./baseIntance";

export const setGuestNickName = async (guest :string, address : string) => {
    const response = await memberAPI.post(`/guest`,{
        "nickName": guest,
        'address' : address
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

export const setGuestRole = async (id : number, role :number) => {
    const response = await memberAPI.put(`/guest/role`,{
        "id": id,
        'role' : role
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const setGuestSession = async (guest :number, session :string) => {
    const response = await memberAPI.put(`/guest/session`,{
        "id": guest,
        'session' : session
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const setMemberLogin = async (email :string, password :string) => {
   const response = await memberAPI.post(`/login`,{
        "email": email,
        'password' : password
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const setMemberSignup = async (email :string, password :string, nickName :string) => {
    const response = await memberAPI.post(`/signup`,{
        "email": email,
        'password' : password,
        'nickName' : nickName
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}