import React, { Component } from "react";
import { Route } from "react-router-dom";

import Search from "./Search";
import Article from "./Article";
import Topic from "./Topic";

class Home extends Component {
  componentDidMount() {
    this.props.updateData(this.props.match.params.type || "/");
  }

  render() {
    console.log(this.props);

    return (
      <div className="row">
        <div className="col-sm-9">
          <Route path="/search/:type" component={Topic.ListWrapper} />
          <Route
            exact
            path="/"
            render={() => {
              return (
                <div>
                  <h5>popular articles</h5>
                  <Article.ListWrapper />
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
