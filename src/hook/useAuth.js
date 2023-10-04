import { signUp } from "../api/auth";
import { signIn as login } from "../api/auth";
import { useState } from "react";
import { getUserProfile } from "../api/profile";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  const existingToken = localStorage.getItem("authToken");

  const updateAuthUser = () => {
    getUserProfile(JSON.parse(localStorage.getItem("authToken"))).then(
      (res) => {
        setAuthUser(res);
      }
    );
  };

  if (existingToken && !authUser) {
    getUserProfile(JSON.parse(existingToken)).then((res) => {
      setAuthUser(res);
    });
  }

  const signIn = (loginData) => {
    login(loginData).then((res) => {
      localStorage.setItem("authToken", JSON.stringify(res.data.token));
      updateAuthUser(res.data.token);
    });
  };

  const clearAuth = () => {
    localStorage.removeItem("authToken");
    setAuthUser(null);
  };

  return {
    signUp,
    signIn,
    authUser,
    clearAuth,
    updateAuthUser,
  };
};

export default useAuth;
