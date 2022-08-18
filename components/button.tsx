import React from 'react';
import { classNames } from '../utils/util';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: string;
  size?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'sm',
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        `btn
                    ${variant}
                    ${size}`
      )}
    >
      {children}
    </button>
  );
};

export default Button;

//className="rounded-full ml-4 px-2 py-0 bg-blue-200"
