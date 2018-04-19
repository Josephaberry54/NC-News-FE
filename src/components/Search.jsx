import React, { Component } from "react";
import produce from "immer";
import PT from "prop-types";

class Search extends Component {
  state = {
    searchInput: ""
  };

  onChange = e => {
    const searchInput = e.target.value;
    this.setState({ searchInput });
  };

  clickHandler = searchInput => {
    this.props.submitSearchRequest(searchInput);
    this.setState(
      produce(draft => {
        draft.searchInput = "";
      })
    );
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        <form className="row">
          <div className="input-group mb-3">
            <input
              value={searchInput}
              onChange={this.onChange}
              type="text"
              className="form-control"
              placeholder="search articles"
            />
            <div className="input-group-append">
              <button
                onClick={() => this.clickHandler(searchInput)}
                className="btn btn-outline-secondary"
                type="button"
              >
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  submitSearchRequest: PT.func
};

export default Search;
