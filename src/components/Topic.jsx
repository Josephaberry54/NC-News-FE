import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Article from './Article';
import { fetchData, fetchTopicsArticles, putVoteOnArticle } from '../Api';
import produce from 'immer';
import PT from 'prop-types';

const Topic = {
  ListWrapper: class ListWrapper extends Component {
    state = {
      topics: []
    };

    componentDidMount = () => {
      fetchData('topics').then(topics => this.setAllTopics(topics));
    };

    setAllTopics = topics => {
      this.setState({ topics });
    };

    render() {
      return (
        <React.Fragment>
          <div className="container-fluid">
            <h3>All Topics</h3>
            <Topic.List topics={this.state.topics} />
          </div>
        </React.Fragment>
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

    componentDidUpdate() {
      if (this.state.topicId !== this.props.match.params.topic_id) {
        this.setState({ topicId: this.props.match.params.topic_id });
        fetchTopicsArticles(
          `/topics/${this.props.match.params.topic_id}/articles`
        ).then(articles => this.setState({ articles }));
      }
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
      const { articles, voteOnArticle } = this.props;
      if (!articles.length) {
        return null;
      }
      const topicTitle = articles[0].belongs_to.title;
      return (
        <div className="container">
          <h3>
            All articles for: {'  '}
            {topicTitle}
          </h3>
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

  Item: function Item({ topic }) {
    const { title, _id } = topic;
    return (
      <div className="list-group-item list-group-item-action d-flex row">
        <Link to={`/topics/${_id}`}>{title}</Link>
      </div>
    );
  }
};

Topic.Page.propTypes = {
  articles: PT.array,
  voteOnArticle: PT.func,
  topicId: PT.string
};

Topic.List.propTypes = {
  topics: PT.array
};

Topic.Item.propTypes = {
  topic: PT.object
};

export default Topic;
