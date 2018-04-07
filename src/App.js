import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomeWrapper from "./components/HomeWrapper";
import Users from "./components/Users";

import Topic from "./components/Topic";
import Article from "./components/Article";
import Comment from "./components/Comment";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Switch>
            {/* this should be a render */}
            <Route exact path="/" component={HomeWrapper} />
            {/* this should be inside the home */}
            <Route exact path="/search" component={HomeWrapper} />
            {/* this is correct */}
            <Route path="/topic/:topic_id" component={Topic.Page} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/article/:article_id" component={Article.Page} />
            {/* this should be inside the article page */}
            <Route
              exact
              path="/article/:article_id/comments"
              component={Comment.Page}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
