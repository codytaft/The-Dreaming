import React, { Component } from 'react';
import { postDreams } from '../../utilities/apicalls';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      date: this.todaysDate(),
      dream: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await postDreams(this.state.date, this.state.dream);
    this.setState({
      date: this.todaysDate(),
      dream: ''
    });
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
            value={this.state.date}
            onChange={this.handleChange}
            className="date-input"
            // defaultValue={this.todaysDate()}
          />
          <textarea
            type="text"
            value={this.state.dream}
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
