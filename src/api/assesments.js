import axios from "axios";

import { baseURL } from "./constant";

export const getAssesmentById = (token, userAssessmentId) =>
  axios
    .get(`${baseURL}assessment/${userAssessmentId}`, {
      headers: {
        Authorization: "JWT " + token,
      },
    })
    .then((res) => res.data);
