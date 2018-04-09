import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { fetchArticles, putVoteOnArticle } from "./Api";
import Comment from "./Comment";
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
        this.setState(
          produce(draft => {
            draft.articles = draft.articles.map((article, index) => {
              if (article._id === article_id) {
                return resultArticle;
              } else {
                return article;
              }
            });
          })
        );
      });
    };

    render() {
      return (
        <div>
          <Article.List
            articles={this.state.articles}
            voteOnArticle={this.voteOnArticle}
          />
        </div>
      );
    }
  },

  PageWrapper: class PageWrapper extends Component {
    state = {
      article: { created_by: {} }
    };

    componentDidMount() {
      fetchArticles().then(articles => this.getArticle(articles));
    }

    getArticle(articles) {
      const articleId = this.props.match.params.article_id;
      const selectedArticle = articles.reduce((accum, article) => {
        if (article._id === articleId) accum = article;
        return accum;
      });
      this.setState({ article: selectedArticle });
    }

    render() {
      return <Article.Page {...this.props} article={this.state.article} />;
    }
  },

  Page: class Page extends Component {
    render() {
      const {
        match: { path, url, params },
        article: { title, body, created_by, votes, comments }
      } = this.props;
      return (
        <div>
          <h5>{votes} votes</h5>
          <h5>{title}</h5>
          <p>{body}</p>
          <Link to={`/users/${created_by._id}`}>
            created by: {created_by.username}
          </Link>
          <Link to={`${url}/comments`}>comments:{comments}</Link>
          <button>Write comment</button>
          <Route
            path={`${path}/comments`}
            render={() => {
              return <Comment.List />;
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
    state = {
      article: this.props.article
    };

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   if (nextProps.votes !== prevState.votes) {
    //     return {
    //       votes: nextProps.votes
    //     };
    //   }
    //   return null;
    // }

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
        votes
      } = this.state.article;
      if (!this.state.article.created_by)
        console.log(this.state.article.article);
      const ID = created_by._id;
      return (
        <div className="list-group-item list-group-item-action d-flex">
          <button className="voteUp btn btn-light" onClick={this.handleClick}>
            up
          </button>
          <span>{votes}</span>
          <button className="voteDown btn btn-light" onClick={this.handleClick}>
            down
          </button>
          <Link to={`/article/${article_id}`}>{title}</Link>
          <span>created by:</span>
          <Link to={`/users/${ID}`}>{created_by.username}</Link>
          <Link to="/article/:article_id/comments">comments</Link>
          <span className="badge badge-primary">{comments}</span>
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
