import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "./Api";

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

    render() {
      return (
        <div>
          <Article.List articles={this.state.articles} />
        </div>
      );
    }
  },

  Page: class Page extends Component {
    render() {
      console.log(this.props.match);
      return (
        <div>
          <h5>An article in full</h5>
          <Link to="/article/:article_id/comments">comments</Link>
          <button>Write comment</button>
        </div>
      );
    }
  },

  List: class List extends Component {
    render() {
      return (
        <div className="list-group">
          {this.props.articles.map((article, index) => {
            return <Article.Item article={article} key={index} />;
          })}
        </div>
      );
    }
  },

  Item: function Item({ article }) {
    const { votes, title, comments } = article;
    return (
      <div className="list-group-item list-group-item-action d-flex">
        <button className="btn btn-light" to="">
          up
        </button>
        <span>{votes}</span>
        <button className="btn btn-light" to="">
          down
        </button>
        <Link to="/article/:article_id">{title}</Link>
        <Link to="/article/:article_id/comments">comments</Link>
        <span className="badge badge-primary">{comments}</span>
        {/* <Link to={`/users/:${created_by}`}>{created_by}</Link> */}
      </div>
    );
  }
};

export default Article;
