import React, { Component } from "react";
import Home from "./Home";
import { fetchData } from "./Api";

export default class HomeWrapper extends Component {
  state = {
    data: []
  };

  updateData = path => {
    fetchData(path).then(data => this.setState({ data }));
  };

  render() {
    return (
      <Home
        {...this.props}
        data={this.state.data}
        updateData={this.updateData}
      />
    );
  }
}
