import React, { Component } from "react";

const Comment = {
  Page: class CommentsPage extends Component {
    render() {
      return (
        <div>
          <button className="btn btn-light">write comment</button>
          <Comment.List />
        </div>
      );
    }
  },

  List: function List() {
    return (
      <div>
        <Comment.Item />
        <Comment.Item />
      </div>
    );
  },

  Item: function Item() {
    return (
      <div className="list-group-item list-group-item-action d-flex">
        <h5>A comments text</h5>
        <button className="btn btn-light">vote</button>
      </div>
    );
  }
};

export default Comment;
