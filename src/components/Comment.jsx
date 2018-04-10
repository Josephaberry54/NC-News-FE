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

  List: function List({ articleComments }) {
    console.log(articleComments);
    return (
      <div>
        {articleComments.map(comment => {
          return <Comment.Item key={comment._id} comment={comment} />;
        })}
      </div>
    );
  },

  Item: function Item({ comment }) {
    console.log(comment);
    const { body, created_at, created_by, votes, _id } = comment;
    return (
      <div className="list-group-item list-group-item-action d-flex" key={_id}>
        {/* <button disabled={votedOn} className="voteUp btn btn-light" onClick={this.handleClick}>
          up
        </button> */}
        <span>{votes}</span>
        {/* <button disabled={votedOn} className="voteDown btn btn-light" onClick={this.handleClick}>
          down
        </button> */}
        <h5>{body}</h5>
        <h5>created on: {new Date(created_at).toDateString()}</h5>
        <h5>created by: {created_by.username}</h5>
      </div>
    );
  }
};

export default Comment;
