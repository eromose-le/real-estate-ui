import React from "react";

interface LoadingButtonProps<T> extends React.ButtonHTMLAttributes<T> {
  isLoading: boolean;
  buttonText: string;
  ref?: React.RefObject<HTMLButtonElement>;
}

const LoadingButton = <T extends HTMLButtonElement>({
  isLoading,
  buttonText,
  ...rest
}: LoadingButtonProps<T>) => {
  return (
    <button className="default-button" {...rest}>
      {buttonText}
      {isLoading && <span id="loading-indicator"></span>}
    </button>
  );
};

export default LoadingButton;
