import { FC, MouseEventHandler, ReactNode } from 'react';
import './app-button.scss';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'correct' | 'wrong';
  isDisabled?: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const button: FC<ButtonProps> = (props) => {
  const variant = props.variant || 'primary';
  const isDisabled = props.isDisabled || false;
  const className = `btn btn--${variant}`;

  return <button
    className={className}
    disabled={isDisabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
}

export default button;