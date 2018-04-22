import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = {
  List: function List({ articleComments, voteOnComment }) {
    return (
      <div className="container">
        {articleComments.map(comment => {
          return (
            <Comment.Item
              key={comment._id}
              comment={comment}
              voteOnComment={voteOnComment}
            />
          );
        })}
      </div>
    );
  },

  Item: function Item({ comment, voteOnComment }) {
    function handleClick(e) {
      const { _id } = comment;
      let voteDirection;
      if (e.currentTarget.className.includes('voteUp')) voteDirection = 'up';
      if (e.currentTarget.className.includes('voteDown'))
        voteDirection = 'down';
      voteOnComment(_id, voteDirection);
    }

    const { body, created_at, created_by, votes, _id, votedOn } = comment;
    console.log(created_by);
    return (
      <div className="list-group-item list-group-item-action d-flex" key={_id}>
        <div className="col-2">
          <div className="row">
            <button
              disabled={votedOn}
              className="voteUp btn btn-light btn-outline-secondary btn-block"
              onClick={handleClick}
            >
              <i className="fas fa-chevron-up" />
            </button>
          </div>
          <div className="text-center">
            <span className="text-center">{votes}</span>
          </div>
          <div className="row">
            <button
              disabled={votedOn}
              className="voteDown btn btn-light btn-outline-secondary btn-block"
              onClick={handleClick}
            >
              <i className="fas fa-chevron-down" />
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="row">
            <div className="col-12">
              <h5>{body}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                created on:{'  '} {new Date(created_at).toDateString()}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span>created by:{'  '} </span>

              <Link to={`/users/${created_by._id}`}>{created_by.username}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Comment.List.propTypes = {
  articleComments: PT.array,
  voteOnComment: PT.func
};

Comment.Item.propTypes = {
  comment: PT.object,
  voteOnComment: PT.func
};

export default Comment;
