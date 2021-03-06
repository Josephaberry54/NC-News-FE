import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {
  fetchArticles,
  putVoteOnArticle,
  fetchComments,
  putVoteOnComment,
  postCommentToArticle,
  deleteCommentById
} from '../Api';
import Comment from './Comment';
import Search from './Search';
import produce from 'immer';
import PT from 'prop-types';

const Article = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      articles: [],
      searchInput: ''
    };

    componentDidMount() {
      fetchArticles().then(articles => this.setState({ articles }));
    }

    submitSearchRequest = searchInput => {
      const filteredArticles = this.state.articles.filter(article => {
        const { title, body } = article;
        return title.includes(searchInput) || body.includes(searchInput);
      });
      this.setState(
        produce(draft => {
          draft.articles = filteredArticles;
        })
      );
    };

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
      const { articles } = this.state;
      return (
        <React.Fragment>
          <div className="container">
            <Search submitSearchRequest={this.submitSearchRequest} />
          </div>

          <div className="container">
            <h3>Popular Articles</h3>
            {!articles.length && <p>Loading</p>}
            <Article.List
              articles={articles}
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
        const newState = produce(this.state, draft => {
          draft.articleComments = draft.articleComments.map(comment => {
            const { _id, votes } = resultComment;
            if (_id === comment_id) {
              comment.votes = votes;
            }
            return comment;
          });
        });
        this.setState(newState);
      });
    };

    voteOnArticle = (article_id, voteDirection) => {
      putVoteOnArticle(article_id, voteDirection).then(resultArticle => {
        const newState = produce(this.state, draft => {
          draft.articles = draft.articles.map(article => {
            const { _id, votes } = resultArticle;
            if (_id === article_id) {
              article.votes = votes;
            }
            return article;
          });
        });
        this.setState(newState);
      });
    };

    updateComments = comment => {
      console.log(comment);
      const updatedComments = [...this.state.articleComments, comment];
      const newState = produce(this.state, draft => {
        draft.articleComments = updatedComments;
      });
      this.setState(newState);
    };

    deleteComment = comment_id => {
      deleteCommentById(comment_id).then(deletedComment => {
        const newState = produce(this.state, draft => {
          draft.articleComments = draft.articleComments.filter(comment => {
            const { _id } = comment;
            return _id !== comment_id;
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
          updateComments={this.updateComments}
          deleteComment={this.deleteComment}
        />
      );
    }
  },

  Page: class Page extends Component {
    state = {
      newComment: ''
    };

    handleChange = e => {
      const newComment = e.target.value;
      this.setState({ newComment });
    };

    triggerUpdateComments = comment => {
      this.props.updateComments(comment);
    };

    handleClick({ newComment }, props) {
      const { _id } = props.article;
      const MY_USER_ID = '5aabf9e8630d476aa2c3ad9e';
      const comment = {
        comment: newComment,
        belongs_to: _id,
        created_by: MY_USER_ID
      };
      postCommentToArticle(_id, comment).then(comment =>
        this.triggerUpdateComments(comment)
      );
      this.setState(
        produce(draft => {
          draft.newComment = '';
        })
      );
    }

    render() {
      const {
        match: { path, url },
        article: { title, body, created_by, votes, comments },
        articleComments,
        voteOnComment,
        deleteComment
      } = this.props;
      return (
        <div className="row">
          <div className="col-sm-2">
            <div>
              <button
                className="voteUp btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i className="fas fa-chevron-up" />
              </button>
            </div>
            <div className="text-center">
              <span>{votes}</span>
            </div>
            <div>
              <button
                className="voteDown btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i className="fas fa-chevron-down" />
              </button>
            </div>
          </div>
          <div className="col-sm-10">
            <h5>{title}</h5>
            <p>{body}</p>
            <div className="row">
              <div className="col-sm-6">
                <span>created by: {'   '}</span>
                <Link to={`/users/${created_by._id}`}>
                  {created_by.username}
                </Link>
              </div>
              <div className="col-sm-6">
                <span>comments: {'   '}</span>
                <Link to={`${url}/comments`}>{comments}</Link>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="input-group mb-3 col">
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
                    deleteComment={deleteComment}
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
      const {
        article: { _id },
        voteOnArticle
      } = this.props;
      let voteDirection;
      if (e.currentTarget.className.includes('voteUp')) voteDirection = 'up';
      if (e.currentTarget.className.includes('voteDown'))
        voteDirection = 'down';
      voteOnArticle(_id, voteDirection);
    };

    render() {
      const {
        title,
        comments,
        _id: article_id,
        created_by,
        votes
      } = this.props.article;

      const ID = created_by._id;
      return (
        <div className="list-group-item list-group-item-action d-flex row py1">
          <div className="col-xs-2">
            <div>
              <button
                className="voteUp btn btn-light btn-outline-secondary btn-block no-gutter"
                onClick={this.handleClick}
              >
                <i className="fas fa-chevron-up" />
              </button>
            </div>
            <div className="text-center">
              <span>{votes}</span>
            </div>
            <div>
              <button
                className="voteDown btn btn-light btn-outline-secondary btn-block"
                onClick={this.handleClick}
              >
                <i className="fas fa-chevron-down" />
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
              <div className="col-12">
                <span>created by:{'  '} </span>
                <Link to={`/users/${ID}`}>{created_by.username}</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <span>comments: {'  '}</span>
                <Link to={`/article/${article_id}/comments`}>
                  <span className="badge badge-primary">{comments}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

Article.ListWrapper.propTypes = {
  articles: PT.array
};
Article.PageWrapper.propTypes = {
  articles: PT.array
};
Article.List.propTypes = {
  articles: PT.array,
  voteOnArticle: PT.func
};
Article.Item.propTypes = {
  article: PT.object
};

Article.List.defaultProps = {
  articles: [
    {
      _id: '',
      title: '',
      comments: 0,
      created_by: {},
      votes: 0
    }
  ]
};
Article.Item.defaultProps = {
  article: {
    _id: '',
    title: '',
    comments: 0,
    created_by: {},
    votes: 0
  }
};

export default Article;
