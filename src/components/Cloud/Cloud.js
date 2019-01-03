import React, { Component } from 'react';
import './Cloud.css';

const ZingChart = require('zingchart-react').core;

let myDataSimple = {
  type: 'wordcloud',
  options: {
    words: [
      { text: 'the', count: 3 },
      { text: 'dog', count: 5 },
      { text: 'cat', count: 7 },
      { text: 'tear', count: 12 },
      { text: 'duggy', count: 2 }
    ]
  }
};

class Cloud extends Component {
  constructor(props) {
    super(props);
  }

  cloudData = () => {
    let cloudData = {
      type: 'wordcloud',
      options: {
        words: this.props.dreams
      }
    };
    return cloudData;
  };

  render() {
    console.log(this.props.dreams);
    return (
      <main className="word-cloud">
        <ZingChart
          id="chart1"
          height="300"
          width="600"
          data={this.cloudData()}
        />
      </main>
    );
  }
}

export default Cloud;
