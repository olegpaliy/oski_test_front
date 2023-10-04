import axios from "axios";

import { baseURL } from "./constant";

export const getUserProfile = (token) =>
  axios
    .get(`${baseURL}profile`, {
      headers: {
        Authorization: "JWT " + token,
      },
    })
    .then((res) => res.data);
