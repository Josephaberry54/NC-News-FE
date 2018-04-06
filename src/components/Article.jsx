import React, { Component } from "react";
import { Link } from "react-router-dom";

const Article = {
  Page: class Page extends Component {
    render() {
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
    componentDidMount() {}

    render() {
      return (
        <div className="list-group">
          <Article.Item />
          <Article.Item />
        </div>
      );
    }
  },

  Item: function Item() {
    return (
      <div className="list-group-item list-group-item-action d-flex">
        <button className="btn btn-light" to="">
          up
        </button>
        <span>score</span>
        <button className="btn btn-light" to="">
          down
        </button>
        <Link to="/article/:article_id">Article title</Link>
        <Link to="/article/:article_id/comments">comments</Link>
        <span className="badge badge-primary">0</span>
      </div>
    );
  }
};

export default Article;
