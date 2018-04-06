import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class TopicListItem extends Component {
  render() {
    return (
      <div>
        <h1>A topic</h1>
        <Link to="/topic/:topic/articles">A Topic</Link>
      </div>
    );
  }
}
