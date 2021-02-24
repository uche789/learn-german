import React from 'react';
import './switcher.css';

interface SwitcherProps {
  onSwitch(): void;
}

const Switcher: React.FC<SwitcherProps> = ({ onSwitch }) => {
  return (
    <div className="switcher">
      <button className="switcher-button" onClick={onSwitch}>Next word</button>
    </div>
  );
}

export default Switcher;
