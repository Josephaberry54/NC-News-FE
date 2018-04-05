import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

// TOPICS are used in Navigation and Home so this is lowest common ancestor

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />

          <Route path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
