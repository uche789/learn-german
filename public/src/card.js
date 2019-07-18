import './card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      word: props.word,
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.word) !== JSON.stringify(this.props.word)) {
      this.setState({word: this.props.word});
      this.setState({lang: 'en'});
    }
  }

  switchLang() {
    let lang;

    if (this.state.lang === 'en') {
      lang = 'de';
    } else {
      lang = 'en';
    }

    this.setState({ lang });
  }

  getLangText() {
    if (this.state.lang === 'en') {
      return 'DE';
    }

    return'EN';
  }

  render() {
    const word = this.state.lang === 'en' ? this.state.word.english : this.state.word.german;
    const switchLang = (
    <div className="card-heading">
      <div className="card-lang" onClick={this.switchLang.bind(this)}>{this.getLangText()}</div>
    </div>
    );

    return (  
      <div className="card">
        {switchLang}
        <div className="card-content">
          {word}
        </div>
      </div>
    );
  };
};