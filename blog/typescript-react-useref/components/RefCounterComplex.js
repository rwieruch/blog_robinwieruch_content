import * as React from 'react';


function App() {
  const [count, setCount] = React.useState(0);

  const ref = React.useRef({
    increment: 0,
    decrement: 0,
  });

  const handleIncrement = () => {
    ref.current.increment++;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    ref.current.decrement++;
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <div>Count: {count}</div>

      <div>
        Buttons {ref.current.increment + ref.current.decrement}{' '}
        times clicked
      </div>

      <div>Increment clicked: {ref.current.increment}</div>
      <div>Decrement clicked: {ref.current.decrement}</div>
    </>
  );
}

export default App;
