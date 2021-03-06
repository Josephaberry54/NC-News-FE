import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Users from './components/Users';
import Topic from './components/Topic';
import Article from './components/Article';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Navigation />
          <Switch>
            <Route exact path="/" component={Article.ListWrapper} />
            <Route exact path="/search/:type" component={Topic.ListWrapper} />
            <Route
              exact
              path="/topics/:topic_id"
              component={Topic.PageWrapper}
            />
            <Route exact path="/users" component={Users.ListWrapper} />
            <Route path="/users/:user_id" component={Users.Page} />
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
