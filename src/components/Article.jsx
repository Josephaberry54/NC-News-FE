import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { fetchArticles, putVoteOnArticle } from "./Api";
import Comment from "./Comment";

const Article = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      articles: []
    };

    componentDidMount() {
      fetchArticles().then(articles => this.setArticlesInState(articles));
    }

    setArticlesInState(articles) {
      this.setState({ articles });
    }

    voteOnArticle = path => {
      putVoteOnArticle(path);
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
          {articles.map(article => {
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

  Item: function Item({ article, voteOnArticle }) {
    const { votes, title, comments, _id, created_by } = article;

    function handleClick(e) {
      let voteDirection;
      if (e.target.className.includes("voteUp"))
        voteDirection = `${_id}?vote=up`;
      if (e.target.className.includes("voteDown"))
        voteDirection = `${_id}?vote=down`;
      voteOnArticle(voteDirection);
    }

    return (
      <div className="list-group-item list-group-item-action d-flex">
        <button className="voteUp btn btn-light" onClick={handleClick}>
          up
        </button>
        <span>{votes}</span>
        <button className="voteDown btn btn-light" onClick={handleClick}>
          down
        </button>
        <Link to={`/article/${_id}`}>{title}</Link>
        <span>created by:</span>
        <Link to={`/users/${created_by._id}`}>{created_by.username}</Link>
        <Link to="/article/:article_id/comments">comments</Link>
        <span className="badge badge-primary">{comments}</span>
      </div>
    );
  }
};

export default Article;
