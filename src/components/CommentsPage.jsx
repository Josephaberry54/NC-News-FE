import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommentsList from "./CommentsList";

export default class CommentsPage extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-light">write comment</button>
        <CommentsList />
      </div>
    );
  }
}
