import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchData } from "./Api";
import logo from "../logo.png";

class Navigation extends Component {
  state = {
    navBarLinkTopicNames: []
  };

  componentDidMount() {
    fetchData("topics").then(topics => this.setNavBarTopics(topics));
  }

  setNavBarTopics(topics) {
    const maxTopicsForNavBar = 5;
    const navBarTopics = topics.slice(0, maxTopicsForNavBar);
    const navBarLinkTopicNames = navBarTopics.map(topic => topic.title);
    this.setState({ navBarLinkTopicNames });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" /> News
        </Link>

        <ul className="navbar-nav ml-auto">
          {this.state.navBarLinkTopicNames.map((title, index) => (
            <NavBarTopicLink key={index} title={title} />
          ))}
          <li>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const NavBarTopicLink = ({ title }) => {
  return (
    <NavLink to={`/topic/${title.toLowerCase()}`}>
      <li>{title}</li>
    </NavLink>
  );
};

export default Navigation;
