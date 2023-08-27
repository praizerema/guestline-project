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
    <div className='space-x-4'>
       <button disabled={count <= 0 } onClick={decrement} className={`'ml-2 text-xl font-bold ${count <= 0 && 'text-gray-400'}`}>-</button>
      <span className='border rounded-md px-4 py-1 ml-2 text-sm'>{count}</span>
      <button onClick={increment} className='text-xl font-bold'>+</button>
    </div>
  );
};

