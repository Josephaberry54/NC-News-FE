import React, { Component } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import { fetchData, fetchTopicsArticles } from "./Api";

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
      return <Topic.List topics={this.state.topics} />;
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

    render() {
      return <Topic.Page {...this.props} articles={this.state.articles} />;
    }
  },

  Page: class Page extends Component {
    render() {
      return (
        <div>
          <h5>topic title</h5>
          <Article.List {...this.props} />
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
