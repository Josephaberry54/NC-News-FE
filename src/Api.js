const axios = require('axios');

const SERVER_URL = 'https://arcane-peak-29702.herokuapp.com/api';

const API = {
  fetchTopicsArticles: function(path) {
    return axios.get(`${SERVER_URL}${path}`).then(({ data }) => data.articles);
  },

  fetchArticles: function() {
    return axios
      .get(`${SERVER_URL}/articles`)
      .then(({ data }) => data.articles);
  },

  fetchData: function(path) {
    return axios.get(`${SERVER_URL}/${path}`).then(({ data }) => data[path]);
  },

  putVoteOnArticle: function(article_id, voteDirection) {
    return axios
      .put(`${SERVER_URL}/articles/${article_id}?vote=${voteDirection}`)
      .then(({ data }) => data);
  },

  putVoteOnComment: function(comment_id, voteDirection) {
    return axios
      .put(`${SERVER_URL}/comments/${comment_id}?vote=${voteDirection}`)
      .then(({ data }) => data);
  },

  fetchComments: function(articleId) {
    return axios
      .get(`${SERVER_URL}/articles/${articleId}/comments`)
      .then(({ data }) => data.comments);
  },

  fetchAllUsers: function() {
    return axios.get(`${SERVER_URL}/users/all`).then(({ data }) => data.users);
  },

  fetchUserById: function(userId) {
    return axios
      .get(`${SERVER_URL}/users/${userId}`)
      .then(({ data }) => data.user);
  },

  postCommentToArticle: function(articleId, comment) {
    return axios
      .post(`${SERVER_URL}/articles/${articleId}/comments`, comment)
      .then(({ data }) => data.commentDoc);
  },

  deleteCommentById: function(comment_id) {
    return axios
      .delete(`${SERVER_URL}/comments/${comment_id}`)
      .then(({ data }) => data);
  }
};

module.exports = API;
