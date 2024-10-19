import React from "react";
import "./switcher.css";
import AppButton from "../../components/button/app-button";

interface SwitcherProps {
  onSwitch(): void;
}

const Switcher: React.FC<SwitcherProps> = ({ onSwitch }) => {
  return (
    <div className="switcher">
      <AppButton onClick={onSwitch}>Next word</AppButton>
    </div>
  );
};

export default Switcher;
