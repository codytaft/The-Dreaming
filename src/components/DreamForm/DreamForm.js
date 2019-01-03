import React, { Component } from 'react';
import { postDreams } from '../../utilities/apicalls';
import './DreamForm.css';

class DreamForm extends Component {
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

  todaysDate = () => {
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
          />
          <textarea
            type="text"
            value={this.state.dream}
            onChange={this.handleChange}
            name="dream"
            className="dream-input"
          />
          <button className="save-dream-btn" ref="SearchButton">
            Save Dream
          </button>
        </form>

        {/* Reimplement for Houndify */}
        {/* <div id="status" ref="Status" className="ui info message">
          Click on microphone icon or type in the text query.
        </div> */}

        <div className="ui field" hidden>
          <label>Response object</label>
          <textarea id="responseJSON" ref="ResponseJSON" />
        </div>
        <div className="ui field" hidden>
          <label>Search info object</label>
          <textarea id="infoJSON" ref="InfoJSON" />
        </div>
      </main>
    );
  }
}

export default DreamForm;
