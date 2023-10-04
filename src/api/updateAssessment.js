import axios from "axios";

import { baseURL } from "./constant";

export const updateAssesmentById = (token, userAssessmentId, body) =>
  axios
    .put(`${baseURL}assessment/${userAssessmentId}`, body, {
      headers: {
        Authorization: "JWT " + token,
      },
    })
    .then((res) => res.data);
