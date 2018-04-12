import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import {
  fetchArticles,
  putVoteOnArticle,
  fetchComments,
  putVoteOnComment,
  postCommentToArticle
} from "../Api";
import Comment from "./Comment";
import Search from "./Search";
import produce from "immer";
import PT from "prop-types";

const Article = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      articles: []
    };

    componentDidMount() {
      fetchArticles().then(articles => this.setState({ articles }));
    }

    voteOnArticle = (article_id, voteDirection) => {
      putVoteOnArticle(article_id, voteDirection).then(resultArticle => {
        resultArticle.votedOn = true;
        const newState = produce(this.state, draft => {
          draft.articles = draft.articles.map(article => {
            if (article._id === article_id) {
              return resultArticle;
            } else {
              return article;
            }
          });
        });
        this.setState(newState);
      });
    };

    render() {
      return (
        <React.Fragment>
          <div className="container">
            <Search />
          </div>

          <div className="container">
            <h3>Popular Articles</h3>
            <Article.List
              articles={this.state.articles}
              voteOnArticle={this.voteOnArticle}
            />
          </div>
        </React.Fragment>
      );
    }
  },

  PageWrapper: class PageWrapper extends Component {
    state = {
      article: { created_by: {} },
      articleComments: []
    };

    componentDidMount() {
      fetchArticles().then(articles => this.getArticle(articles));
      fetchComments(this.props.match.params.article_id).then(articleComments =>
        this.setState({ articleComments })
      );
    }

    getArticle(articles) {
      const articleId = this.props.match.params.article_id;
      const selectedArticle = articles.reduce((accum, article) => {
        if (article._id === articleId) accum = article;
        return accum;
      });
      this.setState({ article: selectedArticle });
    }

    voteOnComment = (comment_id, voteDirection) => {
      putVoteOnComment(comment_id, voteDirection).then(resultComment => {
        resultComment.votedOn = true;
        const newState = produce(this.state, draft => {
          draft.articleComments = draft.articleComments.map(comment => {
            if (comment._id === comment_id) {
              return resultComment;
            } else {
              return comment;
            }
          });
        });
        this.setState(newState);
      });
    };

    render() {
      const { article, articleComments } = this.state;
      return (
        <Article.Page
          {...this.props}
          article={article}
          articleComments={articleComments}
          voteOnComment={this.voteOnComment}
        />
      );
    }
  },

  Page: class Page extends Component {
    state = {
      newComment: ""
    };

    handleChange = e => {
      const newComment = e.target.value;
      this.setState({ newComment });
    };

    handleClick({ newComment }, props) {
      console.log(newComment);
      console.log(props);
      const { _id } = props.article;
      const MY_USER_ID = "5aabf9e8630d476aa2c3ad9e";
      const comment = {
        comment: newComment,
        belongs_to: _id,
        created_by: MY_USER_ID
      };
      postCommentToArticle(_id, comment).then(comment => console.log(comment));
    }

    render() {
      const {
        match: { path, url },
        article: { title, body, created_by, votes, comments, votedOn },
        articleComments,
        voteOnComment
      } = this.props;
      return (
        <div className="row">
          <div className="col-2">
            <div>
              <button
                disabled={votedOn}
                className="voteUp btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i class="fas fa-chevron-up" />
              </button>
            </div>
            <div className="text-center">
              <span>{votes}</span>
            </div>
            <div>
              <button
                disabled={votedOn}
                className="voteDown btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i class="fas fa-chevron-down" />
              </button>
            </div>
          </div>
          <div className="col-10">
            <h5>{title}</h5>
            <p>{body}</p>
            <Link to={`/users/${created_by._id}`}>
              created by: {created_by.username}
            </Link>
            <Link to={`${url}/comments`}>comments:{comments}</Link>
          </div>
          <div className="container">
            <div className="row">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Comment here..."
                  type="text"
                  value={this.state.newComment}
                />
                <button
                  onClick={() => this.handleClick(this.state, this.props)}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
          <Route
            path={`${path}/comments`}
            render={() => {
              return (
                <React.Fragment>
                  <Comment.List
                    articleComments={articleComments}
                    voteOnComment={voteOnComment}
                  />
                </React.Fragment>
              );
            }}
          />
        </div>
      );
    }
  },

  List: class List extends Component {
    render() {
      const { articles, voteOnArticle } = this.props;
      return (
        <div className="list-group">
          {articles.map((article, index) => {
            return (
              <Article.Item
                article={article}
                key={article._id}
                voteOnArticle={voteOnArticle}
              />
            );
          })}
        </div>
      );
    }
  },

  Item: class Item extends Component {
    handleClick = e => {
      const { article: { _id }, voteOnArticle } = this.props;
      let voteDirection;
      if (e.target.className.includes("voteUp")) voteDirection = "up";
      if (e.target.className.includes("voteDown")) voteDirection = "down";
      voteOnArticle(_id, voteDirection);
    };

    render() {
      const {
        title,
        comments,
        _id: article_id,
        created_by,
        votes,
        votedOn
      } = this.props.article;

      const ID = created_by._id;
      return (
        <div className="list-group-item list-group-item-action d-flex row py1 ">
          <div className="col-2">
            <div>
              <button
                disabled={votedOn}
                className="voteUp btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i class="fas fa-chevron-up" />
              </button>
            </div>
            <div className="text-center">
              <span>{votes}</span>
            </div>
            <div>
              <button
                disabled={votedOn}
                className="voteDown btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i class="fas fa-chevron-down" />
              </button>
            </div>
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-12">
                <Link to={`/article/${article_id}`}>{title}</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <span>created by:{"  "} </span>
                <Link to={`/users/${ID}`}>{created_by.username}</Link>
              </div>
              <div className="col-6">
                <Link to={`/article/${article_id}/comments`}>comments</Link>
                {"  "}
                <span className="badge badge-primary">{comments}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

Article.List.propTypes = {
  articles: PT.array
};
Article.Item.propTypes = {
  article: PT.object
};

Article.List.defaultProps = {
  articles: [
    {
      _id: "",
      title: "",
      comments: 0,
      created_by: {},
      votes: 0
    }
  ]
};
Article.Item.defaultProps = {
  article: {
    _id: "",
    title: "",
    comments: 0,
    created_by: {},
    votes: 0
  }
};

export default Article;
