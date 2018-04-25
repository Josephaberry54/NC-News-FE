import React, { Component } from 'react';
import {
  fetchAllUsers,
  fetchUserById,
  fetchArticles,
  putVoteOnArticle
} from '../Api';
import { Link } from 'react-router-dom';
import Article from './Article';
import produce from 'immer';

const Users = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      users: []
    };

    componentDidMount() {
      fetchAllUsers().then(users => this.setState({ users }));
    }

    render() {
      return (
        <div className="container-fluid">
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
        <div className="list-group-item list-group-item-action d-flex container-fluid">
          <div className="row">
            <div className="col-6 w-100">
              <img
                className="img-thumbnail float-left"
                width="200px"
                height="auto"
                src={avatar_url}
                alt={username}
                onError={e => {
                  e.target.src =
                    'https://keypointintelligence.com/img/anonymous.png';
                }}
              />
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{username}</p>
                  <Link to={`/users/${_id}`}>go to page</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  Page: class Page extends Component {
    state = {
      user: {},
      articles: []
    };
    componentDidMount() {
      fetchUserById(this.props.match.params.user_id).then(user =>
        this.setState({ user })
      );

      fetchArticles().then(articles => {
        const userArticles = articles.filter(
          article => article.created_by._id === this.props.match.params.user_id
        );
        this.setState({ articles: userArticles });
      });
    }

    voteOnArticle = (article_id, voteDirection) => {
      putVoteOnArticle(article_id, voteDirection).then(resultArticle => {
        const { votes } = resultArticle;
        const newState = produce(this.state, draft => {
          draft.articles = draft.articles.map(article => {
            if (article._id === article_id) {
              article.votes = votes;
            }
            return article;
          });
        });
        this.setState(newState);
      });
    };

    render() {
      const { avatar_url, name, username } = this.state.user;

      return (
        <div className="container">
          <div className="row">
            <div className="col-3">
              <img
                className="img-thumbnail"
                width="200px"
                height="auto"
                src={avatar_url}
                alt={username}
                onError={e => {
                  e.target.src =
                    'https://keypointintelligence.com/img/anonymous.png';
                }}
              />
            </div>
            <div className=" col-9">
              <div>
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{username}</p>
                </div>
              </div>
            </div>
          </div>
          <Article.List
            articles={this.state.articles}
            voteOnArticle={this.voteOnArticle}
          />
        </div>
      );
    }
  }
};

export default Users;
