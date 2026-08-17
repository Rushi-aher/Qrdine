import api from "./api";

export const getRestaurants = async () => {

    const response = await api.get("/restaurants/public");

    return response.data;

};