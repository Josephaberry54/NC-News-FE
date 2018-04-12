import React, { Component } from "react";
import { fetchAllUsers, fetchUserById } from "../Api";
import { Link } from "react-router-dom";

const Users = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      users: []
    };

    componentDidMount() {
      fetchAllUsers().then(users => this.setState({ users }));
    }

    render() {
      console.log(this.state.users);
      return (
        <div>
          <Users.List users={this.state.users} />
        </div>
      );
    }
  },

  List: class List extends Component {
    render() {
      return (
        <div className="list-group">
          {this.props.users.map(user => {
            return <Users.Item user={user} key={user._id} />;
          })}
        </div>
      );
    }
  },

  Item: class Item extends Component {
    render() {
      const { avatar_url, name, username, _id } = this.props.user;
      return (
        <div className="list-group-item list-group-item-action d-flex">
          <div className="card">
            <img className="card-img-top" src={avatar_url} alt={username} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{username}</p>
            </div>
          </div>
          <Link to={`/users/${_id}`}>go to page</Link>
        </div>
      );
    }
  },

  Page: class Page extends Component {
    state = {
      user: {}
    };
    componentDidMount() {
      fetchUserById(this.props.match.params.user_id).then(user =>
        this.setState({ user })
      );
    }
    render() {
      const { avatar_url, name, username } = this.state.user;

      return (
        <div>
          <div className="card">
            <img className="card-img-top" src={avatar_url} alt={username} />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{username}</p>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Users;
