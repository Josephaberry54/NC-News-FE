import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomeWrapper from "./components/HomeWrapper";
import Users from "./components/Users";

import Topic from "./components/Topic";
import Article from "./components/Article";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Switch>
            {/* this should be a render? */}
            <Route exact path="/" component={HomeWrapper} />
            <Route exact path="/search/:type" component={HomeWrapper} />
            <Route
              exact
              path="/topics/:topic_id"
              component={Topic.PageWrapper}
            />
            <Route path="/users/:user_id" component={Users} />
            <Route
              path="/article/:article_id"
              component={Article.PageWrapper}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
