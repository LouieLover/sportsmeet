import Nav from "./components/nav";
import Jumbotron from "./components/jumbotron";
import Map from "./components/Map";
import Teams from "./components/teams";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post("/user/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenResponse.data) {
        const userRes = await axios.get("/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Nav href="/login" href="/register" href="/teams" />
          <Jumbotron />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/teams" component={Teams} />
          <Route path="/map" component={Map} />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
