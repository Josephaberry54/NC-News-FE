import React, { Component } from "react";
import { BrowserRouter, Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Topic from "./components/Topic";
import Users from "./components/Users";
import Article from "./components/Article";
import CommentsPage from "./components/CommentsPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/topic/:topic_id" component={Topic} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/article/:article_id" component={Article} />
            <Route
              exact
              path="/article/:article_id/comments"
              component={CommentsPage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
