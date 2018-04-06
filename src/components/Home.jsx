import React, { Component } from "react";
import { Route } from "react-router-dom";

import Search from "./Search";
import Article from "./Article";
import Topic from "./Topic";

class Home extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="row">
        <div className="col-sm-9">
          <Route exact path={`${match.path}topics`} component={Topic.List} />
          <Route
            exact
            path={`${match.path}`}
            render={() => {
              return (
                <div>
                  <h5>popular articles</h5>
                  <Article.List />
                </div>
              );
            }}
          />
        </div>
        <div className="col-sm-3">
          <Search />
        </div>
      </div>
    );
  }
}

export default Home;
