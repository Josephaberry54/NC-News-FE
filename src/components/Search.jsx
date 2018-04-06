import React from "react";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <div>
      <div className="row">
        <input className="col" type="text" />
        <button className="col btn btn-light">Search</button>
      </div>
      <Link to="/search">search all topics</Link>
    </div>
  );
};

export default Search;
