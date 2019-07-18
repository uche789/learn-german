import './switcher.css';

export default class Switcher extends React.Component {
  constructor(props) {
    super(props);
  }

  onSwitch(e) {
    this.props.onSwitch();
  }

  render() {
    return (
      <div className="switcher">
        <button className="switcher-button" onClick={this.onSwitch.bind(this)}>Next word</button>
      </div>
    );
  };
};