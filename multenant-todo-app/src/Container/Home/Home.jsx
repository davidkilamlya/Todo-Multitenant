import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router";
import TodoPage from "../TodoPage/TodoPage";

import { decodeJWTToken } from "../../util/decodeJwtToken";

import "./Home.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    // console.log("user Authenticated", isAuthenticated);
    // if (!isAuthenticated) {
    //   navigate("/login");
    // }
    // Get the JWT token from localStorage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Decode the JWT token and get the username
      const decodedToken = decodeJWTToken(token);
      if (decodedToken && decodedToken.userName) {
        setUsername(decodedToken.userName);
        console.log(decodedToken);
      }
    }
  });
  return (
    <div className="home">
      <Header userName={username} />
      <TodoPage />
    </div>
  );
}

export default Home;
