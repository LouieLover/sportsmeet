import React from "react";
import Nav from "./components/nav";
import Jumbotron from "./components/jumbotron";
import Modal from "./components/modal";
import Teams from "./components/teams";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Nav href="/login" href="/register" href="/teams" />
        <Jumbotron />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/teams" component={Teams} />
      </div>
    </Router>
  );
};

export default App;
