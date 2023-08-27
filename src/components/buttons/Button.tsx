import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className: string;

}

export const Button: React.FC<ButtonProps> = ({ label, className, ...rest }) => {
  return (
    <button {...rest} type="button" className={`${className}`} >
      {label}
    </button>
  );
};

