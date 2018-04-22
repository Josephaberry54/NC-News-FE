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
    this.setState({ navBarLinkTopics });
  }

  // <Link
  //             className="flex-sm-fill text-sm-center nav-link active text-info"
  //             to="/"
  //           >
  //             Northcoders News
  //           </Link>

  render() {
    return (
      <div>
        {/* <Header /> */}
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
            <NavBarTopicLink key={topic._id} topic={topic} />
          ))}
        </nav>
      </div>
    );
  }

  // render() {
  //   return (
  //     <nav className="navbar navbar-inverse bg-inverse  container-fluid">
  //       <div className="row">
  //         <div className="col-xl-6">
  //           <div className="row justify-content-center" />
  //         </div>
  //         <div className="col-xl-6">
  //           <div className="row justify-content-center">
  //             {this.state.navBarLinkTopics.map(topic => (
  //               <NavBarTopicLink key={topic._id} topic={topic} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }
}

const NavBarTopicLink = ({ topic }) => {
  const { title, _id } = topic;
  return (
    <NavLink
      className="flex-sm-fill text-sm-center nav-link active text-info d-none d-sm-block"
      to={`/topics/${_id}`}
    >
      {title}
    </NavLink>
  );
};

NavBarTopicLink.propTypes = {
  topic: PT.object
};

export default Navigation;
