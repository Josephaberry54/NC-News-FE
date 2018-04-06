import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Search = () => {
  return (
    <div>
      <div className="row">
        <input className="col" type="text" />
        <button className="col btn btn-light">Search</button>
      </div>
      <Link to="/topics">search all topics</Link>
    </div>
  );
};

export default Search;
