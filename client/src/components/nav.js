import React from "react";
import Teams from "./teams";

const nav = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">SportsMeet</span>
        <ul>
          <a className="navbar-brand" href="/login">
            Login
          </a>
          <a className="navbar-brand" href="/register">
            Register
          </a>
          <a className="navbar-brand" href="/teams">
            Teams
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default nav;
