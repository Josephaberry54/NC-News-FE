import React from "react";
import { Link } from "react-router-dom";

const Search = () => {
  return (
    <div>
      <form className="row">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="search articles"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      <Link to="/search">view all topics</Link>
    </div>
  );
};

export default Search;
