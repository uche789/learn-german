import React from 'react';
import './App.css';
import dictionary from './english-german.json';
import Card from './features/card/Card';
import Switcher from './features/switcher/Switcher';

export type Word = {
  english: string,
  german: string
}

const App: React.FC = () => {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const getRandonWord = (): Word => {
    const wordKeys = Object.keys(dictionary);;
    const index = getRandomInt(wordKeys.length);
    const english = wordKeys[index];
    const german = (dictionary as Record<string, string>)[english];
    const newWord: Word = {
      german,
      english
    };
    return newWord;
  }

  const [ word, setWord ] = React.useState<Word>(getRandonWord());

  const onSwitch = () => {
    setWord(getRandonWord())
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Card word={word}/>
        <Switcher onSwitch={onSwitch}/>
      </div>
    </div>
  );
}

export default App;
