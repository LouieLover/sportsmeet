import React from "react";
import Nav from "./components/nav";
import Jumbotron from "./components/jumbotron";
import Map from "./components/Map";

import Teams from "./components/teams";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Nav href="/login" href="/register" href="/teams" />
        <Jumbotron />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/teams" component={Teams} />
        <Route path="/map" component={Map} />
      </div>
    </Router>
  );
};

export default App;
