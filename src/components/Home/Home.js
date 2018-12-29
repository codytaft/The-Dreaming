import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      dream: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // add to database
  };

  todaysDate = e => {
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0, 10);
    return date;
  };

  render() {
    return (
      <main className="app-home">
        <form className="dream-form" onSubmit={this.handleSubmit}>
          <input
            type="date"
            name="date"
            value={this.state.value}
            onChange={this.handleChange}
            className="date-input"
            defaultValue={this.todaysDate()}
          />
          <textarea
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name="dream"
            className="dream-input"
            placeholder="Dream"
          />
          <button className="save-dream-btn">Save Dream</button>
        </form>
      </main>
    );
  }
}

export default Home;
