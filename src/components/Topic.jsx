import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Articles from "./Articles";

export default class Topic extends Component {
  render() {
    return (
      <div>
        <h5>A topic description</h5>
        <Articles />
      </div>
    );
  }
}
