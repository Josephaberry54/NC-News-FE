import { combineReducers } from "redux";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_ON_ARTICLE,
  VOTE_ON_COMMENT,
  POPULATE_ARTICLES,
  POPULATE_TOPICS,
  POPULATE_USERS
} from "./actions";

function articles(state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return state.map(article => {
        if (article._id === action.articleId) {
          return Object.assign({}, article, {
            comments: [...comments, action.comment]
          });
        }
      });
    default:
      return state;
  }
}

function topics(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

const newsApp = combineReducers({ articles, topics, users });

export default newsApp;
