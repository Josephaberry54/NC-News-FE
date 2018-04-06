import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Users from "./components/Users";

import Topic from "./components/Topic";
import Article from "./components/Article";
import Comment from "./components/Comment";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/topic/:topic_id" component={Topic.Page} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/article/:article_id" component={Article.Page} />
            <Route
              exact
              path="/article/:article_id/comments"
              component={Comment.Page}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
