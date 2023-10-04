import axios from "axios";

import { baseURL } from "./constant";

export const signUp = (signupData) => {
  axios.post(`${baseURL}signup`, signupData);
};

export const signIn = (loginData) =>
  axios.post(`${baseURL}signin`, loginData).then((res) => {
    localStorage.setItem("authToken", JSON.stringify(res.data.token));
    return res;
  });
