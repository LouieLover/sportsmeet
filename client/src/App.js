import Nav from "./components/nav";
import Jumbotron from "./components/jumbotron";
import Map from "./components/Map";
import Teams from "./components/teams";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
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
}

export default App;
