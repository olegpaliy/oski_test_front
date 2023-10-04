import axios from "axios";

import { baseURL } from "./constant";

export const logout = (token) =>
  axios
    .put(
      `${baseURL}signout`,
      {},
      {
        headers: {
          Authorization: "JWT " + token,
        },
      }
    )
    .then((res) => res.data);
