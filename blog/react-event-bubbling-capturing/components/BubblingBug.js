import * as React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  const handleCount = () => {
    setCount((state) => state + 1);
  };

  return (
    <div onClick={handleCount}>
      <button type="button" onClick={handleCount}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
