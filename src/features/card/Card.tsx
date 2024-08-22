import React from 'react';
import './card.css';
import { Word } from '../../App';

interface CardProps {
  word: Word;
}

type Lang = 'en' | 'de';

const Card: React.FC<CardProps> = ({ word }) => {
  const [lang, setLang] = React.useState<Lang>('de');
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(!!word);
  }, [word])

  const getLangText = () => {
    return lang === 'en' ? 'DE' : 'EN';
  }

  const getWord = () => {
    return lang === 'en' ? word.english : word.german;
  }

  const switchLang = () => {
    setLang(lang === 'en' ? 'de' : 'en');
  }

  return (
    <>
      {show &&
        <div className="card">
          <div className="card-heading">
            <div className="card-lang" onClick={switchLang}>{getLangText()}</div>
          </div>
          <div className="card-content">
              {getWord()}
            </div>
        </div>
      }
    </>
  );
}

export default Card;
