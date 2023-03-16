import axios from "axios";

export const axiosIsntance = axios.create({
    baseURL : "https://harborpizza.herokuapp.com/",
});