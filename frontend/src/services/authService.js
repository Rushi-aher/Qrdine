import api from "./api";

export const loginUser = async (email, password) => {

    const formData = new FormData();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
        "/auth/login",
        formData
    );

    return response.data;
};

export const signupUser = async (userData) => {

    const response = await api.post(
        "/auth/signup",
        userData
    );

    return response.data;
};
