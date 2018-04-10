import produce from "immer";
import React from "react";
import { putVoteOnArticle } from "./Api";

const voteOnArticle = (article_id, voteDirection) => {
  putVoteOnArticle(article_id, voteDirection).then(resultArticle => {
    resultArticle.votedOn = true;
    const newState = produce(this.state, draft => {
      draft.articles = draft.articles.map(article => {
        if (article._id === article_id) {
          return resultArticle;
        } else {
          return article;
        }
      });
    });
    this.setState(newState);
  });
};

export default voteOnArticle;
