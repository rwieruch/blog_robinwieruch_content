import * as React from 'react';

const style = {
  padding: '10px',
  border: '1px solid black',
  display: 'flex',
  justifyContent: 'flex-end',
};

function App() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((state) => state + 1);
  };

  return (
    <div style={style}>
      <button type="button" onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
