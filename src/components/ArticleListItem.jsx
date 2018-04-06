import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ArticleListItem = () => {
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
};

export default ArticleListItem;
