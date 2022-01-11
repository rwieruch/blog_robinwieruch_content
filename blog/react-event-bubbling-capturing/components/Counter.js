import * as React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button type="button" onClick={handleClick}>
      Count: {count}
    </button>
  );
}

export default App;
