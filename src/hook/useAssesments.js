import { useEffect, useState } from "react";
import { getAssesmentById } from "../api/assesments";

export const useAssessmentById = (userAssessmentId) => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [assessment, setAssessment] = useState(null);
  useEffect(() => {
    getAssesmentById(token, userAssessmentId).then((res) => setAssessment(res));
  }, [token, userAssessmentId]);

  return { assessment };
};
