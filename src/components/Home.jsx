import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Search from "./Search";
import Articles from "./Articles";
import Topics from "./Topics";

class Home extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="row">
        <div className="col-sm-9">
          <Route exact path={`${match.path}topics`} component={Topics} />
          <Route
            exact
            path={`${match.path}`}
            render={() => {
              return (
                <div>
                  <h5>popular articles</h5>
                  <Articles />
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
