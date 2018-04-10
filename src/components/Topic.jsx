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
      articles: [],
      topicId: this.props.match.params.topic_id
    };

    componentDidMount = () => {
      fetchTopicsArticles(`/topics/${this.state.topicId}/articles`).then(
        articles => this.setState({ articles })
      );
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.match.params.topic_id !== prevState.topicId) {
        return { topicId: nextProps.match.params.topic_id };
      }
      return null;
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
          topicId={this.state.topicId}
          key={this.props.match.params.url}
        />
      );
    }
  },

  Page: class Page extends Component {
    render() {
      const { articles, voteOnArticle, topicId } = this.props;
      const title = articles[0]
        ? articles[0].belongs_to.title
        : "no available articles for this topic!";
      return (
        <div>
          <h5>
            {title}
            {topicId}
          </h5>
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
          return <Topic.Item topic={topic} key={topic._id} />;
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
