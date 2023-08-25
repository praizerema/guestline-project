import React from 'react';

interface CounterProps {
  count: number;
  setCount: (count: number) => void;

}

export const CounterInput: React.FC<CounterProps> = ({ count , setCount}) => {

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if(count > 0){
    setCount(count - 1);}
  };

  return (
    <div>
      {count > 0 && <button onClick={decrement}>-</button>}
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

