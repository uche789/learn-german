import React, { Suspense, useState } from 'react';
import './App.css';
import dictionary from '@/assets/english-german.json';
import Card from './features/card/Card';
import Switcher from './features/switcher/Switcher';
import DropDownMenu from './features/base-components/dropdown/dropdown';
import SelectItem from '@/features/base-components/select-item/select-item';
import { IconType } from './types';
import AppHeader from './features/app-header/app-header';
import AppNav from './features/app-nav/app-nav';
import { Outlet } from 'react-router-dom';

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
      <AppHeader />
      <main className="max-w-screen-lg w-full px-4 m-auto pt-24">
        <AppNav />
        <Outlet />
        <div className="wrapper">
          <Card word={word}/>
          <Switcher onSwitch={onSwitch}/>
          <DropDownMenu 
            clickHandler={clickHander}
            options={[{label: 'first', value: 'first'}, {label: 'second', value: 'second'}]}
            linkName='Hover me'
            selected="first"
          />
          <SelectItem label='C1 level' icon={IconType.French} isBolded={true} onClick={() => {}} />
        </div>
      </main>
    </>
  );
}

export default App;
