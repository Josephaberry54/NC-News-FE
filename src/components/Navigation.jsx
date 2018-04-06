import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "./Api";

class Navigation extends Component {
  state = {
    navBarTopicTitles: []
  };

  componentDidMount() {
    this.getPopularTopics();
  }

  getPopularTopics() {
    API.fetchTopics().then(topics => {
      const maxTopicsForNavBar = 5;
      const navBarTopics = topics.slice(0, maxTopicsForNavBar);
      const navBarTopicTitles = navBarTopics.map(topic => topic.title);
      this.setState({ navBarTopicTitles });
    });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          NorthCoders News
        </Link>

        <ul className="navbar-nav ml-auto">
          {this.state.navBarTopicTitles.map(title => (
            <NavBarTopicLink title={title} />
          ))}
          <li>
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const NavBarTopicLink = ({ title }) => {
  return (
    <Link className="nav-link" to="/topic/:topic_id">
      <li>{title}</li>
    </Link>
  );
};

export default Navigation;
