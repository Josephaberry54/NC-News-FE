import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchData } from '../Api';
import NavBarLink from './NavBarLink';

class Navigation extends Component {
  state = {
    navBarLinkTopics: []
  };

  componentDidMount() {
    fetchData('topics').then(topics => this.setNavBarTopics(topics));
  }

  setNavBarTopics(topics) {
    const maxTopicsForNavBar = 5;
    const navBarLinkTopics = topics.slice(0, maxTopicsForNavBar);
    this.setState({ navBarLinkTopics });
  }

  render() {
    return (
      <div>
        <nav className="nav flex-column flex-sm-row bg-light">
          <NavLink
            to="/"
            className="flex-sm-fill text-sm-center nav-link active text-info"
          >
            Home
          </NavLink>
          <NavLink
            to="/search/topics"
            className="flex-sm-fill text-sm-center nav-link active text-info"
          >
            All Topics
          </NavLink>
          <NavLink
            className="flex-sm-fill text-sm-center nav-link active text-info"
            to="/users"
          >
            Users
          </NavLink>
          {this.state.navBarLinkTopics.map(topic => (
            <NavBarLink key={topic._id} topic={topic} />
          ))}
        </nav>
      </div>
    );
  }
}

export default Navigation;
