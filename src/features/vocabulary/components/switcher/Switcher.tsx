import React from "react";
import "./switcher.css";
import AppButton from "@/components/button/Button";

interface SwitcherProps {
  onSwitch(): void;
  label: string
}

const Switcher: React.FC<SwitcherProps> = ({ onSwitch, label }) => {
  return (
    <div className="switcher">
      <AppButton onClick={onSwitch}>{label}</AppButton>
    </div>
  );
};

export default Switcher;
