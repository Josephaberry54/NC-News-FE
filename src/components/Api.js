const axios = require("axios");

const SERVER_URL = "https://arcane-peak-29702.herokuapp.com/api";

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

  putVoteOnArticle: function(path) {
    //path should be articles/:articles_id?vote=up
    return axios.put(`${SERVER_URL}/articles/${path}`).then(console.log);
  }
};

module.exports = API;
