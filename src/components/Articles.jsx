import React, { Component } from "react";
import ArticleListItem from "./ArticleListItem";

class Articles extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="list-group">
        <ArticleListItem />
        <ArticleListItem />
      </div>
    );
  }
}

export default Articles;
