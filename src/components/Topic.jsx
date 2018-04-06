import React, { Component } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";

const Topic = {
  Page: class Page extends Component {
    render() {
      return (
        <div>
          <h5>A topic description</h5>
          <Article.List />
        </div>
      );
    }
  },

  List: function List() {
    return (
      <div>
        <Topic.Item />
      </div>
    );
  },

  Item: class Item extends Component {
    render() {
      return (
        <div>
          <h1>A topic</h1>
          <Link to="/topic/:topic/articles">A Topic</Link>
        </div>
      );
    }
  }
};

export default Topic;
