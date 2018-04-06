import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import Topics from "./Topics";

class Navigation extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          NorthCoders News
        </Link>

        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
            <Link className="nav-link" to="/topic/:topic_id">
              Popular Topic 1
            </Link>
            <Link className="nav-link" to="/topic/:topic_id">
              Popular Topic 2
            </Link>
            <Link className="nav-link" to="/topic/:topic_id">
              Popular Topic 3
            </Link>
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
