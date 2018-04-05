import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Article = () => {
  return (
    <div>
      <h5>Article 1</h5>
      <Link to="/articles/:article/comments">comments</Link>
      <button className="btn btn-light" to="">
        vote
      </button>
    </div>
  );
};

export default Article;
