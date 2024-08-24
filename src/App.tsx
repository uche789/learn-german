import React, { Suspense, useState } from 'react';
import './App.css';
import dictionary from '@/assets/english-german.json';
import Card from './features/card/Card';
import Switcher from './features/switcher/Switcher';
import DropDownMenu from './features/base-components/dropdown/dropdown';

export type Word = {
  english: string,
  german: string
}

const App: React.FC = () => {
  const [data, setData] = useState('');
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

  const clickHander = (value: string) => {
    console.log(value)
  }

  return (
    <>
      <header className='fixed w-full min-h-16'>STUDY MORE</header>
      <main className="container">
        <div className="wrapper">
          <Card word={word}/>
          <Switcher onSwitch={onSwitch}/>
          <DropDownMenu 
            clickHandler={clickHander}
            options={[{label: 'first', value: 'first'}, {label: 'second', value: 'second'}]}
            linkName='Hover me'
            selected="first"
          />
        </div>
      </main>
    </>
  );
}

export default App;
