import api from "./api";

export const getProducts = async () => {

    const response = await api.get("/food-items");

    return response.data;

};

export const createProduct = async (formData) => {

    const response = await api.post(

        "/food-items",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};

export const updateProduct = async (

    id,

    formData

) => {

    const response = await api.put(

        `/food-items/${id}`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

};

export const deleteProduct = async (id) => {

    const response = await api.delete(

        `/food-items/${id}`

    );

    return response.data;

};