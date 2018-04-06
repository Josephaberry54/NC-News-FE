import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Article extends Component {
  render() {
    return (
      <div>
        <h5>An article in full</h5>
        <Link to="/article/:article_id/comments">comments</Link>
        <button>Write comment</button>
      </div>
    );
  }
}
