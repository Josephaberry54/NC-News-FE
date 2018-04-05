import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Search from "./Search";
import Articles from "./Articles";

import Article from "./Article";
import Comments from "./Comments";
import Topics from "./Topics";
import Topic from "./Topic";

// articles and topics are both used by search so this is the lowest common ancestor

class Home extends Component {
  render() {
    return (
      <div className="row">
        <Articles />
        <Search />

        <Route path="/articles/:article" component={Article} />
        <Route path="/articles/:article/comments" component={Comments} />
        <Route path="/topics" component={Topics} />
        <Route path="/topic/:topic" component={Topic} />
        <Route path="/topic/:topic/articles" component={Articles} />
      </div>
    );
  }
}

export default Home;
