import { movieAPI } from "./baseInstance";

export const setMovieRole = async (movie:string, memberId : number, sceneId :number) => {
    const response = await movieAPI.post(`/role`,{
        movie: movie,
    }, {
        params: {
            memberId : memberId,
            sceneId : sceneId
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const getMyVideos =async (AccessToken:string) => {
    const response = await movieAPI.get(`/me`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
}

export const getPublicVideos =async () => {
    const response = await movieAPI.get(`/list`,{
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getVideo = async (videoId: number, AccessToken : string) => {
    const response = await movieAPI.get(`/${videoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
    return response.data;
}

export const uploadVideo = async (movie : string, video : File, AccessToken : string) => {
    const formData = new FormData();
    formData.append('video', video);
    const response = await movieAPI.post(`/scene?movie=#${movie}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${AccessToken}`
        },
    });
    return response.data;
}