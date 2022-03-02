import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/articles/')
      .then(res => this.setState({ articles: res.data }))
      .catch(alert);
  }

  render() {
    const { article } = this.state;

    return (
      <div className="App">
        {/* Buttons to interact with API */}
        <button onClick={this.createArticle}>Create Article</button>
        <button onClick={this.deleteArticles}>Delete Article</button>
        <button onClick={this.seedArticles}>Seed Article</button>
        {/* List of Articles in Cosmos DB */}
        <ul>
          {article.map(articlemodel => (
            <li
              style={{ listStyleType: 'none', margin: '20px', borderBottom: '1px solid black' }}
              key={articlemodel._id}
            >
              {articlemodel.article}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  createArticle = () => {
    const article = prompt('Enter your Blog post here ->  ');
    if (!article) return;
    axios
      .post('/api/articles/create', { article })
      .then(res => this.setState({ articles: [...this.state.articles, res.data.newArticle] }))
      .catch(err => alert(`Failed to create blog article\n${JSON.stringify(err)}`));
  };

  deleteArticles = () => {
    const doDelete = window.confirm('Delete all data?');
    if (!doDelete) return;
    axios
      .delete('/api/articles/')
      .then(res => this.setState({ articles: [] }))
      .catch(err => alert(`Failed to delete all articles\n${JSON.stringify(err)}`));
  };

  seedArticles = () => {
    const doSeed = window.confirm('Do you want to seed random data?');
    if (!doSeed) return;
    axios
      .post('/api/articles/seed', {})
      .then(() => {
        axios
          .get('/api/articles/')
          .then(res => this.setState({ articles: res.data }))
          .catch(alert);
      })
      .catch(alert);
  };
}

export default App;