import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Todos = () => {
  const { logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/todos", {
          headers: {
            Authorization: token,
          },
        });
        setTodos(response.data.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);
  return (
    <>
      {todos.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p> {item.description} </p>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Todos;
