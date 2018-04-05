import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Topics from "./Topics";

const Navigation = () => {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        NorthCoders News
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <Link className="nav-link" to="/topics/:topic/articles">
            Popular Topic 1
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
