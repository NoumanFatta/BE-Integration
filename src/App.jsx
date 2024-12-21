import React, { useContext } from "react";
import Login from "./components/Login";
import Todos from "./components/Todos";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isAppLoading, userDetails } = useContext(AuthContext);
  return (
    <>
      {isAppLoading ? <h1>Loading...</h1> : userDetails ? <Todos /> : <Login />}
    </>
  );
};

export default App;
