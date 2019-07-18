'use strict';

import './main.css';

import Card from './card';
import Switcher from './switcher';

import dictionary from '../english-german.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: null };
  }

  getRandonWord() {
    const wordKeys = Object.keys(dictionary);;
    const index = this.getRandomInt(wordKeys.length);
    const english = wordKeys[index];
    const german = dictionary[wordKeys[index]];
    const word = {
      english,
      german
    };

    this.setState({ word });
  };

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  componentDidMount() {
    this.getRandonWord();
  }

  render() {
    const { word } = this.state;
    const hasWord = !!word;
    let wrapper;

    if (hasWord) {
      wrapper = (
        <div className="container">
          <div className="wrapper">
            <Card word={this.state.word}/>
            <Switcher onSwitch={this.getRandonWord.bind(this)}/>
          </div>
        </div>
      )
    } else {
      wrapper = <div className="container"></div>
    };

    return (
      <div>
        {wrapper}
      </div>
    );
  };
};

const app = <App />
const container = document.querySelector('#app-root');
ReactDOM.render(app, container);