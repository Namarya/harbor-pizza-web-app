import axios from "axios";

export const axiosIsntance = axios.create({
  baseURL: "https://www.harborpizza.app/",
});
