import { FC, MouseEventHandler, ReactNode } from "react";
import "./app-button.scss";
import { ButtonVariant } from "@/lib/types";

type ButtonProps = {
  variant?: ButtonVariant;
  isDisabled?: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const button: FC<ButtonProps> = (props) => {
  const variant = props.variant || "primary";
  const isDisabled = props.isDisabled || false;
  const className = `btn btn--${variant}`;

  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={props.onClick}
      data-testid={`btn-${variant}`}
    >
      {props.children}
    </button>
  );
};

export default button;
