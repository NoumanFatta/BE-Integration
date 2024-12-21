import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      console.log(loginData);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      loginUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormValues = (ev) => {
    setLoginData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={loginData.email}
          onChange={handleFormValues}
          type="email"
          name="email"
        />
        <input
          value={loginData.password}
          onChange={handleFormValues}
          type="password"
          name="password"
        />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
