import React, { Component } from "react";
import { Link } from "react-router-dom";
import Article from "./Article";
import { fetchData } from "./Api";

const Topic = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      topics: []
    };

    componentDidMount() {
      fetchData("topics").then(topics => this.setTopics(topics));
    }

    setTopics(topics) {
      this.setState({ topics });
    }

    render() {
      return <Topic.List topics={this.state.topics} />;
    }
  },

  Page: class Page extends Component {
    render() {
      return (
        <div>
          <h5>A topic description</h5>
          <Article.ListWrapper />
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
      const { slug, title } = this.props.topic;
      return (
        <div className="list-group-item list-group-item-action d-flex">
          <Link to={`/topic/${slug}/articles`}>{title}</Link>
          <Link to={`/topic/${slug}/articles`}>articles</Link>
        </div>
      );
    }
  }
};

export default Topic;
