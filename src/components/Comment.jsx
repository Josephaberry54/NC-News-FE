import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = {
  List: function List({ articleComments, voteOnComment, deleteComment }) {
    return (
      <div className="container">
        {articleComments.map(comment => {
          return (
            <Comment.Item
              key={comment._id}
              comment={comment}
              voteOnComment={voteOnComment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    );
  },

  Item: function Item({ comment, voteOnComment, deleteComment }) {
    function handleClick(e) {
      const { _id } = comment;
      let voteDirection;
      if (e.currentTarget.className.includes('voteUp')) voteDirection = 'up';
      if (e.currentTarget.className.includes('voteDown'))
        voteDirection = 'down';
      voteOnComment(_id, voteDirection);
    }

    function handleDelete(_id) {
      deleteComment(_id);
    }

    const { body, created_at, created_by, votes, _id } = comment;
    return (
      <div
        className="list-group-item list-group-item-action d-flex row"
        key={_id}
      >
        <div className="col-12">
          <button
            type="button"
            className={`close offset-11 col-1`}
            onClick={() => handleDelete(_id)}
          >
            &times;
          </button>
        </div>
        <div className="col-2">
          <div className="row">
            <button
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
