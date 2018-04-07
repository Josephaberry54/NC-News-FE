import React, { Component } from "react";
import Home from "./Home";
import { fetchData } from "./Api";

export default class HomeWrapper extends Component {
  state = {
    data: []
  };

  updateData(path) {
    fetchData(path).then(data => this.setData(data));
  }

  setData(data) {
    this.setState({ data });
  }

  render() {
    return <Home data={this.state.data} updateData={this.updateData} />;
  }
}
