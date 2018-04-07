import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchData } from "./Api";
import logo from "../logo.png";

class Navigation extends Component {
  state = {
    navBarLinkTopics: []
  };

  componentDidMount() {
    fetchData("topics").then(topics => this.setNavBarTopics(topics));
  }

  setNavBarTopics(topics) {
    const maxTopicsForNavBar = 5;
    const navBarLinkTopics = topics.slice(0, maxTopicsForNavBar);
    // const navBarLinkTopicNames = navBarTopics.map(topic => topic.title);
    this.setState({ navBarLinkTopics });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="d-inline-block align-bottom" />{" "}
          News
        </Link>

        <ul className="navbar-nav ml-auto">
          <li className="dropdown">
            <NavLink to="/search/topics" className="nav-link dropbtn">
              Popular topics
            </NavLink>
            <div className="dropdown-content">
              {this.state.navBarLinkTopics.map(topic => (
                <NavBarTopicLink key={topic._id} topic={topic} />
              ))}
            </div>
          </li>
          <li className="dropdown">
            <NavLink className="nav-link dropbtn" to="/users">
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const NavBarTopicLink = ({ topic }) => {
  const { title, _id } = topic;
  return (
    <NavLink to={`/topics/${_id}`}>
      <span>{title}</span>
    </NavLink>
  );
};

export default Navigation;
