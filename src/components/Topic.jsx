import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Topic extends Component {
  render() {
    return (
      <div>
        <Link to="/topic/:topic/articles">A Topic</Link>
      </div>
    );
  }
}
