import { movieAPI } from "./baseIntance";

export const getMovieList = async () => {
    const response = await movieAPI.get(`/list`);
    return response.data;
}

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

