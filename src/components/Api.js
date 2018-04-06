const axios = require("axios");

const SERVER_URL = "https://arcane-peak-29702.herokuapp.com/api";

const API = {
  fetchTopics: function() {
    return axios.get(`${SERVER_URL}/topics`).then(({ data }) => data.topics);
  }
};

module.exports = API;
