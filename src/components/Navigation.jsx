import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { fetchData } from '../Api';
import PT from 'prop-types';

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
    // const navBarLinkTopicNames = navBarTopics.map(topic => topic.title);
    this.setState({ navBarLinkTopics });
  }

  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse  container-fluid">
        <div className="row">
          <Link className="navbar-brand text-info" to="/">
            <h1 className="display-1">Northcoders News</h1>
          </Link>
        </div>
        <div className="row justify-content-end ">
          <NavLink to="/search/topics" className="nav-link text-white">
            All topics
          </NavLink>
          {this.state.navBarLinkTopics.map(topic => (
            <NavBarTopicLink key={topic._id} topic={topic} />
          ))}
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </div>
      </nav>
    );
  }
}

const NavBarTopicLink = ({ topic }) => {
  const { title, _id } = topic;
  return (
    <NavLink className="nav-link" to={`/topics/${_id}`}>
      {title}
    </NavLink>
  );
};

NavBarTopicLink.propTypes = {
  topic: PT.object
};

export default Navigation;
