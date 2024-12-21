import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/me",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setUserDetails(response.data.data);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 401) {
              logout();
            }
          }
        } finally {
          setIsAppLoading(false);
        }
      } else {
        setIsAppLoading(false);
      }
    })();
  }, []);
  const loginUser = (data) => {
    localStorage.setItem("token", data.token);
    setUserDetails(data.user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUserDetails(null);
  };
  return (
    <AuthContext.Provider
      value={{ userDetails, isAppLoading, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
