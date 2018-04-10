import React, { Component } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import Search from "./Search";
import { fetchData, fetchTopicsArticles, putVoteOnArticle } from "./Api";
import produce from "immer";

const Topic = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      topics: []
    };

    componentDidMount = () => {
      fetchData("topics").then(topics => this.setAllTopics(topics));
    };

    setAllTopics = topics => {
      this.setState({ topics });
    };

    render() {
      return (
        <div className="row">
          <div className="col-sm-9">
            <Topic.List topics={this.state.topics} />
          </div>
          <div className="col-sm-3">
            <Search />
          </div>
        </div>
      );
    }
  },

  PageWrapper: class PageWrapper extends Component {
    state = {
      articles: []
    };

    componentDidMount = () => {
      fetchTopicsArticles(`${this.props.match.url}/articles`).then(articles => {
        return this.setTopicArticles(articles);
      });
    };

    setTopicArticles(articles) {
      return this.setState({ articles });
    }

    voteOnArticle = (article_id, voteDirection) => {
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

    render() {
      return (
        <Topic.Page
          {...this.props}
          articles={this.state.articles}
          voteOnArticle={this.voteOnArticle}
        />
      );
    }
  },

  Page: class Page extends Component {
    render() {
      const { articles, voteOnArticle } = this.props;
      return (
        <div>
          <h5>topic title</h5>
          <Article.List
            {...this.props}
            articles={articles}
            voteOnArticle={voteOnArticle}
          />
        </div>
      );
    }
  },

  List: function List({ topics }) {
    return (
      <div className="list-group">
        {topics.map((topic, index) => {
          return <Topic.Item topic={topic} key={index} />;
        })}
      </div>
    );
  },

  Item: class Item extends Component {
    render() {
      const { title, _id } = this.props.topic;
      return (
        <div className="list-group-item list-group-item-action d-flex">
          <Link to={`/topics/${_id}`}>{title}</Link>
        </div>
      );
    }
  }
};

export default Topic;
