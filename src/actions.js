/*
  actions
*/

export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const VOTE_ON_COMMENT = "VOTE_ON_COMMENT";
export const VOTE_ON_ARTICLE = "VOTE_ON_ARTICLE";
export const POPULATE_ARTICLES = "POPULATE_ARTICLES";
export const POPULATE_TOPICS = "POPULATE_TOPICS";
export const POPULATE_USERS = "POPULATE_USERS";

/*
 action creators
*/

export function addComment(articleId, text, createdById) {
  return {
    type: ADD_COMMENT,
    articleId,
    comment
  };
}

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    CommentId
  };
}

export function voteOnComment(commentId, voteDirection) {
  return {
    type: VOTE_ON_COMMENT,
    commentId,
    direction
  };
}

export function voteOnArticle(articleId, voteDirection) {
  return {
    type: VOTE_ON_ARTICLE,
    articleId,
    voteDirection
  };
}

export function populateArticles() {
  return {
    type: POPULATE_ARTICLES
  };
}

export function populateTopics() {
  return {
    type: POPULATE_TOPICS
  };
}

export function populateUsers() {
  return {
    type: POPULATE_USERS
  };
}
